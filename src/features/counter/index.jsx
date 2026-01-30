import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { increase, decrease } from './counterSlice';

function CounterFeature() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Counter Feature
      </Typography>

      <Typography variant="h5" gutterBottom>
        Count: {count}
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          variant="contained"
          onClick={() => dispatch(increase())}
        >
          Increase
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(decrease())}
        >
          Decrease
        </Button>
      </Box>
    </Box>
  );
}

export default CounterFeature;
