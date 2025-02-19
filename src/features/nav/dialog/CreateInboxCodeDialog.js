import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import * as infoAlert from 'features/alert/infoAlertSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import Captcha from 'features/Captcha';

const CreateInboxCodeDialog = () => {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  return (
    <Dialog open={state.nav.dialogs.createInboxCode.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Create Inbox
        <IconButton onClick={() => dispatch(nav.createInboxCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.nav.dialogs.createInboxCode.inbox?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const [fields, setFields] = useState({
    variant: variantConst.CLASSICAL,
    fen: '',
    startPos: ''
  });

  const dispatch = useDispatch();

  const handleVariantChange = (event: Event) => {
    setFields({
      ...fields,
      variant: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleStartPosChange = (event: Event) => {
    setFields({
      ...fields,
      startPos: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    if (fields.code.toLowerCase() !== fields.solution.toLowerCase()) {
      dispatch(nav.createInboxCodeDialog({ open: false }));
      dispatch(infoAlert.show({
        mssg: 'The CAPTCHA is not valid, please try again with a different one.'
      }));
    } else {
      const settings = {
        ...(fields.fen && {fen: fields.fen}),
        ...(fields.startPos && {startPos: fields.startPos})
      };
      Ws.inboxCreate(fields.variant, JSON.stringify(settings));
    }
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <TextField
          select
          required
          fullWidth
          name="variant"
          label="Variant"
          variant="filled"
          defaultValue={variantConst.CLASSICAL}
          onChange={handleVariantChange}
          margin="dense"
        >
          <MenuItem key={0} value="classical">
            Classical
          </MenuItem>
          <MenuItem key={1} value="960">
            Fischer Random
          </MenuItem>
          <MenuItem key={2} value="capablanca">
            Capablanca
          </MenuItem>
          <MenuItem key={3} value="capablanca-fischer">
            Capablanca-Fischer
          </MenuItem>
        </TextField>
        {
          fields.variant === variantConst.CHESS_960
            ? <TextField
                fullWidth
                required
                name="startPos"
                label="Start position"
                variant="filled"
                helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
                onChange={handleStartPosChange}
                margin="dense"
            />
            : null
        }
        {
          fields.variant === variantConst.CAPABLANCA_FISCHER
            ? <TextField
                fullWidth
                required
                name="startPos"
                label="Start position"
                variant="filled"
                helperText="Examples: ARNBQKBNRC, RABBKRQNCN, NRCKNBBQAR, etc."
                onChange={handleStartPosChange}
                margin="dense"
            />
            : null
        }
        <TextField
          fullWidth
          name="fen"
          label="From FEN position"
          variant="filled"
          onChange={handleFenChange}
          margin="dense"
        />
        <Captcha props={fields} />
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Create Inbox
        </Button>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        variant="filled"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.nav.dialogs.createInboxCode.inbox.hash}
        margin="dense"
      />
      <Button sx={{ mt: 2 }}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(state.nav.dialogs.createInboxCode.inbox.hash);
          dispatch(nav.createInboxCodeDialog({ open: false }));
      }}>
        Copy Inbox Code
      </Button>
    </DialogContent>
  );
}

export default CreateInboxCodeDialog;
