import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function UpdateProductModal({isModalOpen, onHandleModalClose, onHandleModalSubmit, productItem, setProductItem}) {

    const onNameChange = (e) => {
        setProductItem({
            ...productItem,
            name: e.target.value
        });
    }

    const onDescriptionChange = (e) => {
        setProductItem({
            ...productItem,
            description: e.target.value
        });
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={onHandleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <TextField label="Name" variant="outlined" value={productItem.name} onChange={onNameChange} />
                </div>
                <div>
                    <TextField label="Name" variant="outlined" sx={{marginTop: "1em"}}  onChange={onDescriptionChange} value={productItem.description} />
                </div>
                <div>
                    <Button variant="contained" sx={{marginTop: "1em"}} onClick={onHandleModalSubmit}>OK</Button>
                </div>

            </Box>
        </Modal>
    )
}
