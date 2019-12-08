class VideoFiguresService {
  constructor(knex) {
    this.knex = knex;
  }

  async listAllVideoUploaded(userId) {
    if (typeof userId !== "undefined") {
      console.log("starting to get data");
      let queryVideoUploaded = await this.knex
        .select("*")
        .from("video")
        .where("student_id", userId)
        .orderBy("id", "desc")

      return queryVideoUploaded;
    }
  }

  async listLastVideoUploaded(userId){
    if (typeof userId !== "undefined") {
      let queryVideoUploadInOrder = await this.knex
        .select("*")
        .from("video")
        .where("student_id", userId)
        .orderBy("id", "desc")

        return queryVideoUploadInOrder[0]
    }
  }

  async listLastVideoCommented(userId){
    if (typeof userId !== "undefined") {
      let queryVideoCommentInOrder = await this.knex
        .select("*")
        .from("video")
        .where("student_id", userId)
        .andWhere("rating", ">" ,"0")
        .orderBy("updated_at", "desc")

        return queryVideoCommentInOrder[0]
    }
  }

  async listCommentAspect(userId){
    if (typeof userId !== "undefined") {
      let query = await this.knex
        .select("video_comment.comment_aspect", "video_comment.video_id", "video_comment.comment_type", "video_comment.updated_at", "video_comment.comment", "video_comment.comment_timecode", "video_comment.video_link")
        .from("video_comment")
        .innerJoin("video", "video.id", "video_comment.video_id")
        .where("video.student_id", userId)
        .orderBy("updated_at", "desc")

        return query
    }
  }
}

module.exports = VideoFiguresService;
