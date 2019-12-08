class CommentService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(link, userType, userId) {

    // console.log(link, userType, userId)
 
    if (typeof userId !== 'undefined') {

      let query;

      if (userType === 'expert'){
        query = this.knex.select('id', 'comment', 'comment_timecode', 'comment_aspect', 'comment_type')
          .from('video_comment')
          .where({
            'account_id': userId,
            'video_link': link
          })
          .orderBy(['comment_timecode', 'id'])

          
        this.knex('video')
          .where({ video_link: link, expert_id: null })
          .update({
            expert_id: userId
          });



      } else if (userType === 'student'){
        query = this.knex.select('id', 'comment', 'comment_timecode', 'comment_aspect', 'comment_type')
          .from('video_comment')
          .where({
            // 'account_id': userId,
            'video_link': link
          })
          .orderBy(['comment_timecode', 'id'])
      }

      // console.log('!!!!!!',query)
      
      return query.then((rows) => {

        // console.log("COMMENT SERVICE!!!!!" + rows)

        return rows.map(row => ({
          id: row.id,
          comment: row.comment,
          timeCode: row.comment_timecode,
          commentAspect: row.comment_aspect,
          commentType: row.comment_type
        }))
       
       

      });
    }
  }

   add(comment, userId) {
    let query = this.knex
      .select('id')
      .from('account')
      .where('id', userId);


    return query.then((rows) => {
      
      if (rows.length === 1) {
        return this.knex.insert({
          comment: comment.comment,
          comment_timecode: comment.timeCode,
          account_id: rows[0].id,
          video_id: comment.video_id,
          video_link: comment.currentVideoLink,
          comment_type: comment.commentType,
          comment_aspect: comment.commentAspect
        }).into('video_comment')
      
      } else {
        throw new Error(`Cannot add a comment to a user that doesn't exist!`);
      }  
    });
  };

  update(commentId, selectedComment, userId) {

    let query = this.knex
      .select('id')
      .from('account')
      .where('id', userId);

    return query.then((rows => {
      
      if (rows.length === 1) {
        
        return this.knex('video_comment')
          .where({id: selectedComment.id})
          .update({
            comment: selectedComment.comment
          })

      } else {
        throw new Error(`Cannot update a comment if the user doesn't exist!`)
      }
    })
    );

  };

  remove(commentId, userId) {
    let query = this.knex
      .select('id')
      .from('account')
      .where('id', userId);

    return query.then((rows) => {
      if (rows.length === 1) {
        return this.knex('video_comment')
          .where('id', commentId)
          .del()
      } else {
        throw new Error(`Cannot remove a comment when the user doesn't exist!`)
      }
    });
  };
};

module.exports = CommentService;