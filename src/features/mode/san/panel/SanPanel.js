import React from 'react';
import { Grid } from '@mui/material';
import StartedButtons from 'features/mode/san/panel/StartedButtons';
import Buttons from 'features/panel/Buttons';
import ButtonsDialogs from 'features/panel/ButtonsDialogs';
import GameMetadataTable from 'features/panel/GameMetadataTable';
import History from 'features/panel/History';
import MovesTable from 'features/panel/MovesTable';
import OpeningTable from 'features/panel/OpeningTable';
import styles from 'features/panel/styles';

const SanPanel = ({ props }) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={styles.panel}>
        <GameMetadataTable />
        <Grid item xs={12} sx={styles.moves}>
          <Grid item xs={12} sx={styles.buttons}>
            <History />
          </Grid>
          <Grid item xs={12}>
            <MovesTable />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={styles.buttons}>
          <Buttons props={props} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <StartedButtons />
        <OpeningTable />
      </Grid>
      <ButtonsDialogs />
    </Grid>
  );
};

export default SanPanel;
