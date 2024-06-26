import { Button } from "@mui/material";
import axios from "axios";
import { useAlert } from "../Contexts/AlertContext";
import { useAuth } from "../Contexts/AuthContext";
import config from "../config";

export function DeleteItemModal({
  item,
  closeModal,
  setIsLoading,
  setItems,
  items,
  itemType,
}) {
  const { showAlert } = useAlert();
  const { accessToken } = useAuth();

  const onYesClick = async () => {
    setIsLoading(true);
    try {
      let itemId;
      if (itemType === "clinic") {
        itemId = item.clinic_id;
      } else if (itemType === "doctor") {
        itemId = item.doctor_id;
      } else if (itemType === "pharmacy") {
        itemId = item.pharmacy_id;
      }
      let url = `${config.baseURL}/user/delete`;

      const response = await axios.post(url, {
        accessToken,
        id: itemId,
        role: itemType,
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
