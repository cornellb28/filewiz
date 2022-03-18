const nodeID3 = require("node-id3");
const fs = require("fs");

//tags.image is the path to the image (only png/jpeg files allowed)
const tags = {
  title: "Tomorrow",
  artist: "Kevin Penkin",
  album: "asdfd",
  APIC: "./example/mia_cover.jpg",
  year: 2017,
  comment: {
    language: "eng",
    text: "some text",
  },
  TRCK: "27",
  TXXX: [
    {
      description: "testtt.",
      value: "ja moin.",
    },
    {
      description: "testtt2.",
      value: "ja moin2.",
    },
    {
      description: "testtt3.",
      value: "ja moin3.",
    },
  ],
  private: [
    {
      ownerIdentifier: "AbC",
      data: "asdoahwdiohawdaw",
    },
    {
      ownerIdentifier: "AbCSSS",
      data: Buffer.from([0x01, 0x02, 0x05]),
    },
  ],
  chapter: [
    {
      elementID: "Hey!",
      startTimeMs: 5000,
      endTimeMs: 8000,
      tags: {
        title: "abcdef",
        artist: "akshdas",
      },
    },
    {
      elementID: "Hey2!",
      startTimeMs: 225000,
      endTimeMs: 8465000,
      tags: {
        artist: "abcdef222",
      },
    },
  ],
};

console.log(
  nodeID3.write(
    tags,
    "/Volumes/MUSICLITE/CAPITALRECORDS/90s/._02 Emotional.m4a"
  )
);
// let success = nodeID3.write(
//   tags,
//   "/Volumes/MUSICLITE/CAPITALRECORDS/90s/._02 Emotional.m4a"
// );
//console.log(success);

// console.log(
//   nodeID3.read("/Volumes/MUSICLITE/CAPITALRECORDS/90s/._02 Emotional.m4a")
//     .chapter[0].tags
// );

/*nodeID3.create(tags, function(frame) {
  console.log(frame)
})*/

//let file = fs.readFileSync("./example/Kevin Penkin - Tomorrow.mp3")
/*nodeID3.update(tags, file, function(err, buffer) {
  console.log(err)
  console.log(buffer)
})*/

//fs.writeFileSync("./example/Kevin Penkin - Tomorrow.mp3", nodeID3.update(tags, file))

//console.log(nodeID3.read("./example/example.mp3"))

//async

// nodeID3.write(
//   tags,
//   "/Volumes/MUSICLITE/CAPITALRECORDS/90s/._02 Emotional.m4a",
//   function (err) {
//     console.log(err);
//   }
// );

//console.log(nodeID3.read("./example/Kevin Penkin - Tomorrow.mp3"))

/*console.log("READING\n\n")
nodeID3.read("./example/Kevin Penkin - Tomorrow.mp3", function(err, tags) {
  console.log(err)
  console.log(tags)

  console.log("REMOVING\n\n")
  nodeID3.removeTags("./example/Kevin Penkin - Tomorrow.mp3", function(err) {
    console.log("READING\n\n")
    nodeID3.read("./example/Kevin Penkin - Tomorrow.mp3", function(err, tags) {
      console.log(err)
      console.log(tags)
    })
  })

})
*/

/*nodeID3.update({
  TXXX: [{
    description: "testtt.",
    value: "value4."
  }, {
    description: "testtt2.",
    value: "value6."
  },]
}, "./example/example.mp3", (err) => {
  console.log(nodeID3.read("./example/example.mp3"))
})*/

/*console.log(nodeID3.update({
  TXXX: [{
    description: "testtt.",
    value: "value4."
  }, {
    description: "testtt2.",
    value: "value6."
  },]
}, "./example/example.mp3"));

console.log(nodeID3.read("./example/example.mp3"))*/
