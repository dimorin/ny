<template>
    <div>
        <h2>USA map</h2>
        <div class="usamap"></div>        
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
        var usamap_path = d3.geo.path();//기본 USA Albers 프로젝션을 사용한다.
        //var map_svg = d3.select(".map").append("svg").attr("width", width).attr("height", height);
        var usamap_svg = d3.select(".usamap").append("svg").attr("viewBox", `0 0 ${width} ${height}`).attr("width", '100%');/* .attr("height", 'auto') */
        var usamap_path_g = usamap_svg.append('g').attr('class','usamap_path_g').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));
     
        d3.json("https://raw.githubusercontent.com/dimorin/d3-cookbook/master/data/us.json", function (error, topology) {
            usamap_path_g.selectAll("path")
                .data(topojson.feature(topology, topology.objects.states).features) //topojson.feature 함수를 통해 토폴로지 데이터를 GeoJSON 포맷과 유사한 좌표로 변환해준다.
                .enter().append("path").attr("d", usamap_path)
                .on('click',function(d){
                    console.log(d);
                });
        });

        function zoom() {
            usamap_path_g.attr("transform", "translate("+ d3.event.translate+ ")scale(" + d3.event.scale + ")");
        }
    }
}
</script>

<style scoped>

</style>