class VideoService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(userId) {
      if (typeof userId !== 'undefined') {
        let query = await this.knex.select('expert_id', 'student_id', 'id', 'video_link', 'song_name', 'composer', 'instrument', 'grade', 'thumbnail_url', 'music_score_url', 'rating', 'created_at', 'updated_at')
          .from('video')

        return query
      }
  }
}

module.exports = VideoService;