class EarningFiguresService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(userId) {
    if (typeof userId !== "undefined") {
      // console.log("starting to get data");
      let queryVideoUploaded = await this.knex
        .select(
          "id",
          "video_link",
          "song_name",
          "thumbnail_url",
          "instrument",
          "created_at"
        )
        .from("video")
        .where("expert_id", userId)
        .orderBy("created_at", "desc");

      let queryTotalVideoDuration = await this.knex
        .from("video")
        .where("expert_id", userId)
        .sum("video_time_duration");

      let queryVideoCommented = await this.knex
        .select(
          "id",
          "video_link",
          "song_name",
          "thumbnail_url",
          "instrument",
          "updated_at",
          "rating"
        )
        .from("video")

        .whereNot("rating", "0")
        .andWhere("expert_id", userId)
        .orderBy("updated_at", "desc");

      let lastVideoPost = queryVideoUploaded[0];
      let lastVideoComment = queryVideoCommented[0];

      let videoData = {
        numOfVids: queryVideoUploaded.length,
        durationOfVids: queryTotalVideoDuration[0].sum,
        lastVideoPost: [
          {
            id: lastVideoPost.id,
            song: lastVideoPost.song_name,
            thumbnail: lastVideoPost.thumbnail_url,
            video_link: lastVideoPost.video_link,
            instrument: lastVideoPost.instrument,
            date: lastVideoPost.created_at
          }
        ],
        lastVideoComment: [
          {
            id: lastVideoComment.id,
            song: lastVideoComment.song_name,
            thumbnail: lastVideoComment.thumbnail_url,
            video_link: lastVideoComment.video_link,
            instrument: lastVideoComment.instrument,
            date: lastVideoComment.updated_at,
            rating: lastVideoComment.rating
          }
        ]
      };

      return videoData;
    }
  }
}

module.exports = EarningFiguresService;
