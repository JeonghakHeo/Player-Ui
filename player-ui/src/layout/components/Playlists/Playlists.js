import './Playlists.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@mui/styles'
import moment from 'moment'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import Collapse from '@mui/material/Collapse'
import FavoriteIcon from '@mui/icons-material/Favorite'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlaylistCover from '../PlaylistCover/PlaylistCover'
import { SET_PAUSE } from '../../../redux/constants/playerConstants'
import { playSong } from '../../../redux/actions/actions'

const useStyle = makeStyles({
  active: {
    backgroundColor: '#2a2a2a',
    borderRadius: '5px',
  },
  play: {
    '&:hover': {
      transform: 'scale(105%)',
    },
    '&:active': {
      opacity: '0.8',
    },
  },
  icon: {
    '&:hover': {
      color: '#fff',
    },
  },
  iconButton: {
    '&:hover': {
      color: '#fff',
    },
  },
})

const Playlists = () => {
  const classes = useStyle()

  const dispatch = useDispatch()

  const [menuOpen, setMenuOpen] = useState(false)

  const playlist = useSelector((state) => state.playlist)
  const { playlistInfo, loading } = playlist

  const player = useSelector((state) => state.player)
  const { playerController, currentTrack, playerState } = player

  const tracks = playlistInfo?.tracks?.items

  const handlePlay = (position) => {
    dispatch(playSong(playlistInfo?.id, position))
  }

  const togglePlay = () => {
    playerController.togglePlay()
    if (playerState?.paused) {
      dispatch({ type: SET_PAUSE, payload: false })
    } else {
      dispatch({ type: SET_PAUSE, payload: true })
    }
  }

  const openMenu = () => {
    // setMenuOpen(!menuOpen)
    window.alert('More features are waiting to come!')
  }

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60000)
    const seconds = ((duration % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const formatDate = (addedAt) => {
    return moment.utc(addedAt).format('MMM D, YYYY')
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 40px 20px 40px',
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {playerState?.paused ? (
                <PlayCircleIcon
                  color='primary'
                  sx={{ fontSize: '70px' }}
                  className={classes.play}
                  onClick={togglePlay}
                />
              ) : (
                <PauseCircleIcon
                  color='primary'
                  sx={{ fontSize: '70px' }}
                  className={classes.play}
                  onClick={togglePlay}
                />
              )}

              <FavoriteIcon color='primary' sx={{ fontSize: '40px' }} />
              <ArrowCircleDownIcon
                color='secondary'
                sx={{ fontSize: '40px' }}
                className={classes.icon}
                onClick={() =>
                  window.alert('More features are waiting to come!')
                }
              />
              <MoreHorizIcon
                color='secondary'
                sx={{ fontSize: '40px' }}
                className={classes.icon}
                onClick={openMenu}
              />
            </Box>
            {/* <Collapse in={menuOpen} timeout='auto' unmountOnExit>
              <List
                disablePadding
                sx={{
                  position: 'absolute',
                  width: '170px',
                  top: '405px',
                  left: '230px',
                  backgroundColor: '#282828',
                  borderRadius: '3px',
                }}
              >
                <ListItem>
                  <ListItemButton
                    disableRipple
                    sx={{
                      borderRadius: '3px',
                      margin: '5px 5px',
                      '&:hover': {
                        backgroundColor: '#3e3e3e',
                      },
                    }}
                  >
                    <Typography color='white' variant='body2'>
                      Liked Songs
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse> */}
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          sx={{ backgroundColor: '', padding: '10px 40px 0px 40px' }}
        >
          <Grid
            item
            xs={0.5}
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography
              variant='h3'
              component='h3'
              color='secondary'
              fontSize='20px'
            >
              #
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='h3' component='h3' color='secondary'>
              TITLE
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h3' component='h3' color='secondary'>
              ALBUM
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h3' component='h3' color='secondary'>
              DATE ADDED
            </Typography>
          </Grid>
          <Grid item xs={0.5} sx={{ textAlign: 'center' }}>
            <Typography variant='h3' component='h3' color='secondary'>
              <AccessTimeIcon />
            </Typography>
          </Grid>
        </Grid>

        {/* divider */}
        <hr className='divider' style={{ width: '95%' }} />
      </Box>
      <Box
        sx={{
          backgroundColor: '',
        }}
      >
        {/* Each song */}
        <Box sx={{ padding: '0px 30px' }}>
          {!loading &&
            tracks?.map((track, index) => (
              <Box className='song' key={index}>
                <Grid
                  container
                  justifyContent='space-between'
                  alignItems='center'
                  onClick={() => handlePlay(index)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#2a2a2a',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    },
                    padding: '20px 10px',
                  }}
                >
                  <Grid
                    item
                    xs={0.5}
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      color={
                        currentTrack?.name === track?.track?.name
                          ? 'primary'
                          : 'white'
                      }
                    >
                      {index + 1}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Box
                      sx={{
                        marginRight: '15px',
                        height: '50px',
                        width: '50px',
                        backgroundColor: 'purple',
                      }}
                    >
                      <PlaylistCover
                        image={track?.track?.album?.images[0]?.url}
                      />
                    </Box>
                    <Box sx={{ marginRight: '25px' }}>
                      <Typography
                        variant='body1'
                        color={
                          currentTrack?.name === track?.track?.name
                            ? 'primary'
                            : 'white'
                        }
                      >
                        {track?.track?.name}
                      </Typography>
                      <Typography variant='subtitle1'>
                        {track?.track?.artists
                          .map((artist) => artist)
                          .map((item) => item.name)
                          .join(', ')}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant='subtitle1'
                      noWrap
                      sx={{ marginRight: '15px' }}
                    >
                      {track?.track?.album?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='subtitle1'>
                      {formatDate(track?.added_at)}
                    </Typography>
                  </Grid>
                  <Grid item xs={0.5} sx={{ textAlign: 'center' }}>
                    <Typography variant='subtitle1'>
                      {formatDuration(track?.track?.duration_ms)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  )
}

export default Playlists
