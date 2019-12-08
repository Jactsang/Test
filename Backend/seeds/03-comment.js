exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('video_comment').del()
  .then(function () {
    return knex('video_comment').insert([
      {
        video_id: 6,
        comment_timecode: "0:10",
        account_id: 2,
        video_link: "https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b",
        comment: "Your fingers are too tense.",
        comment_aspect:"posture",
        comment_type: true
      },
      {
        video_id: 6,
        comment_timecode: "0:20",
        account_id: 2,
        video_link: "https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b",
        comment: "Try to sit up straight.",
        comment_aspect:"posture",
        comment_type: false
      },
      {
        video_id: 6,
        comment_timecode: "0:30",
        account_id: 2,
        video_link: "https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b",
        comment: "You can vary the sound more during your performance.",
        comment_aspect:"style",
        comment_type: false
      },
      {
        video_id: 6,
        comment_timecode: "0:23",
        account_id: 2,
        video_link: "https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b",
        comment: "I see you have put in a lot of effort here.",
        comment_aspect:"others",
        comment_type: true
      },
      {
        video_id: 6,
        comment_timecode: "0:40",
        account_id: 2,
        video_link: "https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b",
        comment: "Not bad over all.",
        comment_aspect:"others",
        comment_type: true
      }
    ])
  })



};



