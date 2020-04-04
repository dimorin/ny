<template>
    <div>
        <h2>world top headline</h2>
        <div style="position:absolute;">
            버튼 링크, 토탈 갯수 맞지 않는 거 수정,<br>
            참고 https://codepen.io/maggiben/pen/snljd <br>
            설치 https://www.npmjs.com/package/d3-geo-projection <br>
            텍스트를 음성으로 https://speech-api.kakao.com/#none <br>
            번역 https://developers.kakao.com/docs/latest/ko/translate/dev-guide
        </div>
        
        <div class="worldmap"></div>  
        <q-banner inline-actions rounded class="bg-orange text-white">
            {{ country }} <small v-if="articles_items.length">{{ articles_items.length }}</small>    
        </q-banner>     
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="item in articles_items" :key="item.title" class="my-card col-md-4">
                <q-img :src="item.urlToImage">
                    <div class="absolute-bottom">
                        <div class="text-h6">{{item.title}}</div>
                        <div class="text-subtitle2" v-if="item.author">by {{item.author}}</div>
                        <div class="text-subtitle2" v-if="item.publishedAt">{{item.publishedAt}}</div>
                    </div>
                </q-img>
                <q-card-section class="q-pt-none">
                    {{ item.description }}
                </q-card-section>
                <q-card-actions>
                    <a target="_blank" :href="item.url">more</a>
                </q-card-actions>
            </q-card>
        </div>
        <ul>
            <li v-if="!articles_items.length">no article</li>
            <li v-for="item in articles_items" :key="item.title">
                <a :href="item.url" target="_blank">
                {{item.title}} [{{item.source.name}}]
                </a>        
            </li>
        </ul> 
    </div>
</template>

<script>
import axios from 'axios'
import d3 from 'd3'
import {queue} from 'd3-queue'
import * as topojson from "topojson-client";
//topojson package has been deprecated
//so, Use topojson-client, topojson-server,  topojson-simplify
export default {
    data(){
        return {
            country:'',
            articles_items:[],
        }
    },
    created(){        
    },
    methods:{
        makeWorldmap(){
            var _this = this;
            var width = 950, height = 700;
            var colors = { clickable: '#4db6ac', hover: '#26a69a', clicked: "#00695c", clickhover: "#004d40" };
            var projection = d3.geo.orthographic()
                .scale(300)
                .translate([width / 2, height / 2])
                .clipAngle(90)
                .precision(10);
            
            var radius = 10;
            var path = d3.geo.path().projection(projection).pointRadius( function() {return radius;});

            var graticule = d3.geo.graticule();

            var map = d3.select(".worldmap").append("svg").attr("viewBox", `0 0 ${width} ${height}`).style({"max-width":width,"width":"100%"}).attr("class", "map");

            map.append("defs").append("path")
                .datum({ type: "Sphere" })
                .attr("id", "sphere")
                .attr("d", path);

            map.append("use")
                .attr("class", "stroke")
                .attr("xlink:href", "#sphere");

            map.append("use")
                .attr("class", "fill").style({"fill":"#ffffff"})
                .attr("xlink:href", "#sphere");

            map.append("path")
                .datum(graticule)
                .attr("class", "graticule").style({"fill": "none","stroke":"#777","stroke-width":".5px","stroke-opacity":".5"})
                .attr("d", path);
            
            queue()
                .defer(d3.json, "./world-110m.json")
                .defer(d3.tsv, "./world-country-names_code.tsv")
                .await(ready);

            function ready(error, world, names) {
                if (error) throw error;

                var countries = topojson.feature(world, world.objects.countries).features;
                    //borders = topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; });
                    //globe = { type: "Sphere" },
                    //land = topojson.feature(world, world.objects.land),
                countries = countries.filter(function (d) {
                    return names.some(function (n) {
                        if (d.id == n.id) return d.name = n.name;
                    });
                }).sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });

                map.insert("path", ".graticule")
                    .datum(topojson.feature(world, world.objects.land))
                    .attr("class", "land").style({"fill":"#4db6ac"})
                    .attr("d", path);

                for (var i = 0; i < names.length; i++) {
                    for (var j = 0; j < countries.length; j++) {
                        if (countries[j].id == names[i].id) {
                            var country = map.insert("path", ".graticule")
                                .datum(countries[j])
                                .attr("fill", colors.clickable)
                                .attr("d", path)
                                .attr("class", "clickable")
                                .attr("data-country-id", j)
                                .attr('data-country-code',names[i].code)
                                .on("click", function (d) {  
                                    _this.fetchCountryData(d3.select(this)[0][0].dataset.countryCode);
                                    _this.country = d.name;
                                    console.log(d3.select(this)[0][0].dataset.countryCode);    
                                    console.log(d.name)                          ;
                                    d3.selectAll(".clicked")
                                        .classed("clicked", false)
                                        .attr("fill", colors.clickable);
                                    d3.select(this)
                                        .classed("clicked", true)
                                        .attr("fill", colors.clicked);

                                    (function transition() {
                                        d3.select(".clicked").transition()
                                            .duration(1250)
                                            .tween("rotate", function () {
                                                var p = d3.geo.centroid(countries[d3.select(this).attr("data-country-id")]),
                                                    r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                                                return function (t) {
                                                    projection.rotate(r(t));
                                                    map.selectAll("path").attr("d", path);
                                                }
                                            });
                                    })();
                                })
                                .on("mousemove", function () {
                                    var c = d3.select(this);
                                    if (c.classed("clicked")) {
                                        c.attr("fill", colors.clickhover);
                                    } else {
                                        c.attr("fill", colors.hover);
                                    }
                                })
                                .on("mouseout", function () {
                                    var c = d3.select(this);
                                    if (c.classed("clicked")) {
                                        c.attr("fill", colors.clicked);
                                    } else {
                                        d3.select(this).attr("fill", colors.clickable);
                                    }
                                });
                            country.append('svg:title').text( function(d) {return d.name; });
                        }
                    }
                }

                map.insert("path", ".graticule")
                    .datum(topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }))
                    .attr("class", "boundary").style({"fill":"none","stroke":"#fff","stroke-width":".5px"})
                    .attr("d", path);
            }
            
            // Setup zoom behavior:
            var zoom = d3.behavior.zoom(true).scale( projection.scale() ).scaleExtent([100, 800]).on("zoom", globeZoom);
            map.call(zoom);
            
            // Helper functions //			
            function globeZoom() { 
                if (d3.event) {
                    var _scale = d3.event.scale;
                    projection.scale(_scale);                
                    path.pointRadius( radius );

                    d3.selectAll('#sphere').attr('d', path);
                    d3.selectAll('.land').attr('d', path);
                    d3.selectAll('.clickable').attr('d', path);
                    d3.selectAll('.boundary').attr('d', path);
                    d3.selectAll('.graticule').attr('d', path);                
                } // end IF
            }
        },
        fetchCountryData(code){
            axios.get(`https://newsapi.org/v2/top-headlines?country=${code}&apiKey=${process.env.VUE_APP_NEWS_KEY}`)
            .then(response => {
                console.log(response.data.totalResults);
                console.log(response.data.articles);
                this.articles_items = response.data.articles;
            })            
        },
    },
    mounted(){        
        this.makeWorldmap();
    }
}
</script>

<style scoped>
</style>