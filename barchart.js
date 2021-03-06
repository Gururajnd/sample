var svg = d3.select("svg"),
margin = 200,
width = svg.attr("width") - margin,
height = svg.attr("height") - margin


var xScale = d3.scaleBand().range([0, width]).padding(0.4),
yScale = d3.scaleLinear().range([height, 0]);

var g = svg.append("g")
.attr("transform", "translate(" + 100 + "," + 100 + ")");


var list = {
"fields": [
    {
        "id": "a",
        "label": "State\/ Category",
        "type": "string"
    },
    {
        "id": "b",
        "label": "State \/ Utilisation",
        "type": "string"
    },
    {
        "id": "c",
        "label": "2010-11",
        "type": "string"
    },
    {
        "id": "d",
        "label": "2011-12",
        "type": "string"
    },
    {
        "id": "e",
        "label": "2012-13",
        "type": "string"
    },
    {
        "id": "f",
        "label": "2013-14",
        "type": "string"
    },
    {
        "id": "g",
        "label": "2014-15",
        "type": "string"
    },
    {
        "id": "h",
        "label": "2015-16",
        "type": "string"
    },
    {
        "id": "i",
        "label": "2016-17 (P)",
        "type": "string"
    }
],
"data": [
    [
        "Assam",
        "Gross Production (GP)",
        "2679.849",
        "2904.541",
        "2909.786",
        "2868.03",
        "2958.247",
        "3024.78",
        "3127.88"
    ]
]
}

list.fields.splice(0, 2);
list.data[0].splice(0, 2);

var arrayList = [];
list.fields.map(function (d) {
arrayList.push({
    year: d.label
});
})


console.log(arrayList);
arrayList.map(function (ele, index) {
list.data[0].map(function (d, idx) {
    if (index === idx) {
        ele.value = d;
    }
});
});


xScale.domain(arrayList.map(function (d) { return d.year; }));
yScale.domain([0, d3.max(arrayList, function (d) {
return d.value;
})]);

//Creating x-axis
g.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xScale));


//Creating y-axis
g.append("g")
.call(d3.axisLeft(yScale).tickFormat(function (d) {
    return d;
}).ticks(10));

//Drawing vertical barsa
g.selectAll(".bar")
.data(arrayList)
.enter().append("rect")
.attr("class", "bar")
.attr("x", function (d) { return xScale(d.year); })
.attr("y", function (d) { return yScale(d.value); })
.attr("width", xScale.bandwidth())
.attr("height", function (d) { return height - yScale(d.value); });