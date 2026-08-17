# For Progga — Birthday Website

A fully static, free-to-host romantic birthday website. No database, framework, paid service, or build step is required.

## 1. Open it
Double-click `index.html` to preview it locally, or drag the whole folder into a static hosting service.

## 2. Add your own photos
Put new images in:

`media/photos/`

Then open `media.js` and add an entry to `SITE_MEDIA.photos`:

```js
{ src: 'media/photos/my-photo.jpg', title: 'Our memory', note: 'A little caption.' }
```

The existing 12 photos are already wired into the site.

## 3. Add videos
Put `.mp4` or `.webm` files in:

`media/videos/`

Then add:

```js
{ src: 'media/videos/proposal.mp4', title: 'Proposal Day', note: 'The moment.' }
```

to `SITE_MEDIA.videos`.

## 4. Add music
Put an audio file in `media/music/`, for example:

`media/music/our-song.mp3`

Then change this line in `media.js`:

```js
music: 'media/music/our-song.mp3'
```

Browsers generally block autoplay, so the visitor must tap the Music button.

## 5. Free hosting
Recommended free static hosting options include GitHub Pages and Cloudflare Pages. You only need to upload this folder/repository. A custom domain is optional and may cost money.

## Important limitation
A website hosted as a static site cannot permanently save files that someone uploads through the browser. The built-in media system therefore uses local files you place in the project. You can add/remove/replace them whenever you want and redeploy.

## No tracking
This version uses no analytics, database, login, ads, or third-party backend.
