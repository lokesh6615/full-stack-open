import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const LoginForm = ({
  username,
  password,
  handleUserNameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: { xs: '90vw', sm: '350px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Username"
          variant="outlined"
          data-testid="userName"
          value={username}
          onChange={handleUserNameChange}
          size="small"
          margin="dense"
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          data-testid="password"
          value={password}
          onChange={handlePasswordChange}
          size="small"
          margin="dense"
          fullWidth
        />
        <Button variant="contained" type="submit" fullWidth>
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm
