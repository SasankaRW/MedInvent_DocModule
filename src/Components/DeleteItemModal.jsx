import { Button } from "@mui/material";
import axios from "axios";

export function DeleteItemModal({
  item,
  closeModal,
  setIsLoading,
  setPharmacies,
  pharmacies,
}) {
  const onYesClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete("http://localhost:8080/delete", {
        headers: {
          "pharmacy-id": item.pharmacy_id,
        },
      });

      if (response.status === 200) {
        setPharmacies(
          pharmacies.filter(
            (pharmacy) => pharmacy.pharmacy_id !== item.pharmacy_id
          )
        );
        console.log("Item deleted successfully");
      } else {
        console.log("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
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
