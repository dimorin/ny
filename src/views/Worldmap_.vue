<template>
    <div>
        <h2>world map</h2>
        <div>
            참고 https://codepen.io/maggiben/pen/snljd <br>
            설치 https://www.npmjs.com/package/d3-geo-projection <br>
            텍스트를 음성으로 https://speech-api.kakao.com/#none <br>
            번역 https://developers.kakao.com/docs/latest/ko/translate/dev-guide
        </div>
        
        <div class="worldmap"></div>        
    </div>
</template>

<script>
import d3 from 'd3'
import * as topojson from "topojson-client";
//topojson package has been deprecated
//so, Use topojson-client, topojson-server,  topojson-simplify
export default {
    created(){        
    },
    mounted(){        
        var width = 960, height = 500;
        var map_path = d3.geo.path().projection(d3.geo.mercator().scale(100));
        var map_svg = d3.select(".worldmap").append("svg").attr("width", width).attr("height", height);
        /* var map_svg = d3.select(".worldmap").append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("width", '100%'); */
        var map_path_g = map_svg.append('g').attr('class','map_path_g').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));
     
        d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function (error, world) {
            if (error) throw error;
            map_path_g.selectAll("path")
                .data(topojson.feature(world,world.objects.countries).features)
                .enter().append("path").attr("d", map_path)
                .on('click',function(d){
                    console.log(d);
                }).on('mouseenter',function(){
                    d3.select(this).style('fill','red')
                }).on('mouseleave',function(){
                    d3.select(this).style('fill','black')
                });
        });

        function zoom() {
            map_path_g.attr("transform", "translate("+ d3.event.translate+ ")scale(" + d3.event.scale + ")");
        }
    }
}
</script>

<style scoped>
</style>