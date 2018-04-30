import { Router } from 'express'
import mime from 'mime-type'

/**
 * Node API
 * In the future, will manipulate Node resources.
 * --Not implemented yet--
 */

const router = new Router()


router.post('/', (req, res) => {
  // Each req.files keys correspond to an input field of type 'file'
  if (req.files) {
    console.log(req.files);

    const mediaFile = req.files.mediaFile;

    const mediaDir = '/static/uploads';
    const mediaUrl = '/uploads'

    const basename = Math.random().toString(36).replace('.', 'a');
    const extension = mime.extension(req.files.mediaFile.mimetype);
    const filename = basename;
    const dateString = (new Date()).toISOString().split('T')[0];
    const fileDir  = `${mediaDir}/${dateString}/${filename}`;
    const fileUrl  = `${mediaUrl}/${dateString}/${filename}`;

    mediaFile.mv(fileDir, function(err) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.json({
          media: {
            id: basename,
            url: fileUrl
          }
        });
      }
    });

  } else {
    return res.status(400).send('No files were uploaded');

  }
})

router.get('/:nodeId', (req, res) => {

})


export default router
