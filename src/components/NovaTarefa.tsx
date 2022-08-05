import { Button, Grid, TextField } from '@mui/material';
import './Styles.css';

const NovaTarefa = () => {
    return (
        <div className='NovaTarefa-container'>
            <div className='Campo Header'>Nova tarefa</div>
            <Grid container spacing={2} mt={0.5}>
                <Grid item sm={12}>
                    <TextField 
                        multiline 
                        rows={4}
                        variant="standard"
                        style={{
                            backgroundColor: "#779977",
                            width: '80%',
                            padding: '20px',
                            border: '1px solid white',
                            borderRadius: '5px',
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                            disableUnderline: true,
                        }}
                    />
                </Grid>
                <Grid item sm={12} ml={2} mr={2}>
                    <Button variant={'contained'} color={'success'} fullWidth>Adicionar</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default NovaTarefa;