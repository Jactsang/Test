class RatingService {
  constructor(knex) {
    this.knex = knex;
  }

  list(url, userId) {
    if (typeof userId !== 'undefined') {
      let query = this.knex.select('rating')
        .from('video')
        .where('video_link', url)
        // .andWhere('expert_id', userId)
        // .orWhere('student_id', userId)
        
      return query.then((rows) => {
        // console.log(rows[0].rating)
        return rows[0].rating
      });
    };
  }
  

  add(rating, url, userId) {
    let query = this.knex
      .select('id')
      .from('account')
      .where('id', userId);


    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex.update({
          rating: rating
        }).into('video')
          .where('video_link', url);
      } else {
        throw new Error(`Cannot add a rating to a video that doesn't exist!`);
      }  
    });
  };

};

module.exports = RatingService;