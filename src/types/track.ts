import { uniqueId } from "lodash";
import uniqid from "uniqid";
import NodeID3 from "node-id3";
import trackMeta from ".";

export function trackConversion(
  items: Partial<NodeID3.Tags>,
  file: string,
  type: string,
  name: string
) {
  const { mime, imageBuffer } = items.image;
  let newTags: trackMeta = {
    trackId: uniqid("track_"),
    location: file,
    type: type,
    name: name,
    children: [
      {
        title: items.title ? items.title : "",
        artist: items.artist ? items.artist : "",
        bpm: items.bpm ? items.bpm : "",
        remixArtist: items.remixArtist ? items.remixArtist : "",
        composer: items.composer ? items.composer : "",
        size: items.size ? items.size : "",
        contentGroup: items.contentGroup ? items.contentGroup : "",
        initialKey: items.initialKey ? items.initialKey : "",
        publisher: items.publisher ? items.publisher : "",
        year: items.year ? items.year : "",
        genre: items.genre ? items.genre : "",
        image: { mime: mime, imageBuffer: imageBuffer } ? { mime: mime, imageBuffer: imageBuffer } : "",
      },
    ],
  };
  //console.log(newTags);
}
