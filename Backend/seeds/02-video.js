exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('video').del()
    .then(function () {
      // Inserts seed entries
      return knex('video').insert([
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fpiano1.mp4?alt=media&token=41659f13-1672-4346-bffd-beae04e51272',
          student_id: 3,
          expert_id: 2,
          song_name: 'Finale from Sonata in D, Hob XVI 37',
          composer: 'Haydn',
          instrument: 'piano',
          grade: 6,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '132.469841',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fpiano1mp4?alt=media&token=129e39d3-f715-45c0-b695-00204d7f022d',
          rating: 0
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fpiano2.mp4?alt=media&token=dfdd14a4-d72d-467e-aea5-2e5d1320485b',
          student_id: 1,
          expert_id: 2,
          song_name: 'Kolombina Tanci',
          composer: 'Martinů',
          instrument: 'piano',
          grade: 6,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '85.44',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fpiano2mp4?alt=media&token=36f97fb1-91d9-4172-9136-eeb7c2b4d749',
          rating: 0
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fpiano3.mp4?alt=media&token=b9a52c95-a345-4d78-b47b-df566917584c',
          student_id: 1,
          expert_id: 2,
          song_name: 'Hallelujah!',
          composer: 'Martha Mier',
          instrument: 'piano',
          grade: 2,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '56.679909',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fpiano3mp4?alt=media&token=bd793c3c-bdb0-47d8-8d8c-15fb2088ae47',
          rating: 0
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsinging1.mp4?alt=media&token=a70d091a-0481-44de-96a5-fc750b44c84b',
          student_id: 1,
          expert_id: 2,
          song_name: '農家',
          composer: '李雨',
          instrument: 'singing',
          grade: 5,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '84.613515',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fsinging1mp4?alt=media&token=3659e71e-73c1-4f9a-8fcf-49e94e9ec47c',
          rating: 0
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsinging2.mp4?alt=media&token=dbaebbb8-ea81-4773-bdb1-76753323f4e8',
          student_id: 1,
          expert_id: 2,
          song_name: 'Earth, Sea and Sky',
          composer: 'Lin Marsh',
          instrument: 'singing',
          grade: 2,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '122.85678',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fsinging2mp4?alt=media&token=74514c7c-fcf4-4b36-864b-a17a42612004',
          rating: 0
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video.mp4?alt=media&token=b44275f4-c33b-41b7-8b92-a3c20b68124b',
          student_id: 1,
          expert_id: 2,
          song_name: 'Happy Song',
          composer: 'Happy Man',
          instrument: 'singing',
          grade: 3,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '198.600272',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fsample-videomp4?alt=media&token=31a9b2c8-a9ac-4816-ae77-fb35c8f7c579',
          rating: 4
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video4.mp4?alt=media&token=59c93f6d-c44a-4a57-b10f-6caecf3229a4',
          student_id: 1,
          expert_id: 2,
          song_name: 'Another Nice Song',
          composer: 'Talented Man',
          instrument: 'piano',
          grade: 5,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '239.769252',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fsample-video4mp4?alt=media&token=a81a65f9-7a5b-41d4-a94c-f025e0bb50a7',
          rating: 4
        },
        {
          video_link: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/video%2Fsample-video3.mp4?alt=media&token=1fa31042-f1bd-463f-bf49-343bf0ff522d',
          student_id: 1,
          expert_id: 2,
          song_name: 'Love Song',
          composer: 'Lovely Girl',
          instrument: 'guitar',
          grade: 2,
          music_score_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/scoresheet%2Fsample-scoresheet.pdf?alt=media&token=a0d3a78a-4219-47a7-900b-fe69a30e4abf',
          video_time_duration: '179.444',
          thumbnail_url: 'https://firebasestorage.googleapis.com/v0/b/tiger-music-2019.appspot.com/o/thumbnail%2Fsample-video3mp4?alt=media&token=9d0bb3e7-612e-412a-a410-17321b64fbfc',
          rating: 5
        }
      ]);
    });
};



