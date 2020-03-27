<template>
    <div>
        <h2>worldmap</h2>
        <div ref="statename"></div>
        <div class="map"></div>        
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
        var state_ABBREVIATIONS = [{ussate:'Alabama',abbreviation:'AL'},
        {ussate:'Alaska',abbreviation:'	AK'},
        {ussate:'Arizona',abbreviation:'AZ'},
        {ussate:'Arkansas',abbreviation:'AR'},
        {ussate:'California',abbreviation:'CA'},
        {ussate:'Colorado',abbreviation:'CO'},
        {ussate:'Connecticut',abbreviation:'CT'},
        {ussate:'Delaware',abbreviation:'DE'},
        {ussate:'Florida',abbreviation:'FL'},
        {ussate:'Georgia',abbreviation:'GA'},
        {ussate:'Hawaii',abbreviation:'HI'},
        {ussate:'Idaho',abbreviation:'ID'},
        {ussate:'Illinois',abbreviation:'IL'},
        {ussate:'Indiana',abbreviation:'IN'},
        {ussate:'Iowa',abbreviation:'IA'},
        {ussate:'Kansas',abbreviation:'KS'},
        {ussate:'Kentucky',abbreviation:'KY'},
        {ussate:'Louisiana',abbreviation:'	LA'},
        {ussate:'Maine',abbreviation:'ME'},
        {ussate:'Maryland',abbreviation:'MD'},
        {ussate:'Massachusetts',abbreviation:'MA'},
        {ussate:'Michigan',abbreviation:'MI'},
        {ussate:'Minnesota',abbreviation:'MN'},
        {ussate:'Mississippi',abbreviation:'MS'},
        {ussate:'Missouri',abbreviation:'MO'},
        {ussate:'Montana',abbreviation:'MT'},
        {ussate:'Nebraska',abbreviation:'NE'},
        {ussate:'Nevada',abbreviation:'NV'},
        {ussate:'New Hampshire',abbreviation:'NH'},
        {ussate:'New Jersey',abbreviation:'NJ'},
        {ussate:'New Mexico',abbreviation:'NM'},
        {ussate:'New York',abbreviation:'NY'},
        {ussate:'North Carolina',abbreviation:'NC'},
        {ussate:'North Dakota',abbreviation:'ND'},
        {ussate:'Ohio',abbreviation:'OH'},
        {ussate:'Oklahoma',abbreviation:'OK'},
        {ussate:'Oregon',abbreviation:'OR'},
        {ussate:'Pennsylvania',abbreviation:'PA'},
        {ussate:'Rhode Island',abbreviation:'RI'},
        {ussate:'South Carolina',abbreviation:'SC'},
        {ussate:'South Dakota',abbreviation:'SD'},
        {ussate:'Tennessee',abbreviation:'TN'},
        {ussate:'Texas',abbreviation:'TX'},
        {ussate:'Utah',abbreviation:'UT'},
        {ussate:'Vermont',abbreviation:'VT'},
        {ussate:'Virginia',abbreviation:'VA'},
        {ussate:'Washington',abbreviation:'WA'},
        {ussate:'West Virginia',abbreviation:'WV'},
        {ussate:'Wisconsin',abbreviation:'WI'},
        {ussate:'Wyoming',abbreviation:'WY'},
   ];
        
        var width = 960, height = 500;
        var map_path = d3.geo.path();
        //var map_svg = d3.select(".map").append("svg").attr("width", width).attr("height", height);
        var map_svg = d3.select(".map").append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("width", '100%').attr("height", 'auto');
        var map_path_g = map_svg.append('g').attr('class','map_path_g').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));
        var _this = this;
        d3.json("https://raw.githubusercontent.com/dimorin/d3-cookbook/master/data/us.json", function (error, topology) {
            map_path_g.selectAll("path")
                .data(topojson.feature(topology, topology.objects.states).features)
                .enter().append("path")
                .attr("d", map_path).on('click',function(d){
                    console.log(d);
                    console.log(state_ABBREVIATIONS[d.id-1].ussate);
                    _this.$refs.statename.textContent = state_ABBREVIATIONS[d.id-1].ussate;
                });
        });

        function zoom() {
            map_path_g.attr("transform", "translate("
                + d3.event.translate
                + ")scale(" + d3.event.scale + ")");
        }
    }
}
</script>

<style>
path {fill: #ccc;stroke: #fff;stroke-width: .5px;}
path:hover {fill: red;}
</style>