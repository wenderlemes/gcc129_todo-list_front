import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './Styles.css';
import React from 'react';
import { ptBR } from 'date-fns/locale';
import { DateTimePicker } from '@mui/x-date-pickers';

interface IModalCadastroProps {
    aberto: boolean;
    handleCancelar: () => void;
    handleConfirmar: () => void;
    titulo: string;
    prazo: Date | null;
    setPrazo: (prazo: Date | null) => void;
    descricao: string;
    setDescricao: (descricao: string) => void;
}

const ModalCadastro = ({ aberto, handleCancelar, handleConfirmar, titulo, prazo, setPrazo, descricao, setDescricao }: IModalCadastroProps ) => {
    return (
        <Dialog open={aberto} onClose={handleCancelar} fullWidth>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <TextField
                            value={descricao}
                            onChange={(valor) => setDescricao(valor.target.value)}
                            autoFocus
                            multiline 
                            rows={4}
                            id="descricao"
                            label="Descrição"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item sm={12} mb={2}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                            <DateTimePicker
                                label="Prazo"
                                value={prazo}
                                onChange={(novoPrazo) => {
                                    setPrazo(novoPrazo);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item sm={6}>
                        <Button variant="contained" color="error" onClick={handleCancelar} fullWidth>Cancelar</Button>
                    </Grid>
                    <Grid item sm={6}>
                        <Button variant="contained" color="success" onClick={handleConfirmar} fullWidth>Salvar</Button>
                    </Grid>
                </Grid>
                
            </DialogContent>
        </Dialog>
    );
}

export default ModalCadastro;