import { Router } from 'express'
import mime from 'mime-types'
import { default as path, dirname } from 'path'
import {
  existsSync as fileExists,
  mkdirSync as mkdir
} from 'fs'


const router = new Router()


const mediaDir = `${dirname(dirname(__dirname))}/static/uploads`
const mediaUrl = '/uploads'
const urlForMedia = (id) => `${mediaUrl}/${id}`


router.post('/', (req, res) => {
  if (req.files) {

    const mediaFile = req.files.file



    const extension = mime.extension(mediaFile.mimetype)
    const basename = Math.random().toString(36).replace('.', 'a')
    const filename = basename + '.' + extension
    const fileDir  = `${mediaDir}/${filename}`

    mediaFile.mv(fileDir, function(error) {
      if (error) {
        return res.status(500).json({ error })
      } else {
        res.json({
          media: {
            id: filename,
            url: urlForMedia(filename)
          }
        })
      }
    })

  } else {
    return res.status(400).json({ error: 'No files were uploaded' })

  }
})

router.get('/:mediaId', (req, res) => {
  res.json({
    media: {
      id: req.params.mediaId,
      url: urlForMedia(req.params.mediaId)
    }
  })
})


export default router
