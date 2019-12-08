class VideoUploadService {
    constructor(knex){
        this.knex = knex;
    }

    async addVid(payload, userId){
        
        console.log('starting to add')
        let query = await this.knex
            .insert({
                student_id: payload.id,
                expert_id: 2,
                video_link: payload.vidURL,
                video_time_duration: payload.vidDuration,
                song_name: payload.song,
                composer: payload.composer,
                instrument: payload.instrument,
                grade: payload.grade,
                music_score_url: payload.scoreURL,
                thumbnail_url: payload.thumbURL,
                rating: 0
            })
            .into('video')
            .returning('id')
            
            .catch(err => {
                throw new Error('error here ', err)
            })

            let queryUpdate = await this.knex('account')
            .decrement('quota_decreased', 1)
            .where('id', userId)

            console.log('add vid: ', query)
            console.log('decrease vid quota: ', queryUpdate)
    }

    
}

module.exports = VideoUploadService