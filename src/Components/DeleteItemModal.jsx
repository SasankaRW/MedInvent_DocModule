import { Button } from "@mui/material";
import axios from "axios";
import { useAlert } from "../Contexts/AlertContext";

export function DeleteItemModal({
  item,
  closeModal,
  setIsLoading,
  setItems,
  items,
  itemType,
}) {
  const { showAlert } = useAlert();

  const onYesClick = async () => {
    setIsLoading(true);
    try {
      let url = `http://localhost:8080/${itemType}/delete`;
      let headerName = `${itemType}-id`;
      let headerValue = item[`${itemType}_id`];

      const response = await axios.delete(url, {
        headers: {
          [headerName]: headerValue,
        },
      });

      if (response.status === 200) {
        setItems(
          items.filter((i) => i[`${itemType}_id`] !== item[`${itemType}_id`])
        );
        showAlert("success", `${itemType} deleted successfully`);
      } else {
        showAlert("error", `Failed to delete the ${itemType}`);
      }
    } catch (error) {
      showAlert("error", `Failed to delete the ${itemType}`);
    } finally {
      setIsLoading(false);
    }
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
