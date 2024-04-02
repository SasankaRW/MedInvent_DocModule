import { Button } from "@mui/material";

export function DeleteItemModal({ item, closeModal }) {
  const onYesClick = () => {
    alert("deleted");
    closeModal();
  };

  const onNoClick = () => {
    closeModal();
  };

  return (
    <div>
      <div>
        Are you sure want to delete <b>{item.name}</b>
      </div>
      <div className="text-end mt-4">
        <Button
          variant="contained"
          className="mx-2"
          sx={{ backgroundColor: "gray" }}
          disableFocusRipple
          disableTouchRipple
          onClick={onNoClick}
        >
          No
        </Button>
        <Button variant="contained" onClick={onYesClick}>
          Yes
        </Button>
      </div>
    </div>
  );
}
