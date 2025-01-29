import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from "react-bootstrap";
import { deleteCompany } from "../../api";

const DeleteModal = ({
  show,
	handleClose,
	companyToDelete,
	refreshCompanies,
	setToastSuccess,
	setShowToastSuccess,
	setToastError,
	setShowToastError
}) => {
  const handleDelete = async() => {
    try {
      const response = await deleteCompany(companyToDelete.id);
      if (response.data.status === "Success") {
        handleClose();
        refreshCompanies();
        setToastSuccess(null);
        setToastSuccess(response.data.message);
        setShowToastSuccess(true);
      }
    } catch (error) {
      console.error("Error deleting company:", error);
      handleClose();
      setToastError(error.message);
      setShowToastError(true);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const error = error.response.data.message;
        handleClose();
        setToastError(error);
        setShowToastError(true);
      }
    }
  };

  return (
    <Modal
			show={show}
			onHide={() => {
				handleClose();
			}}
			backdrop="static"
			keyboard={false}
			centered
		>
			<ModalHeader>
				<ModalTitle>Delete Company</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<p>
					Are you sure you want to permanently delete the company record for{" "}
					<strong>{companyToDelete ? companyToDelete.company_name : ""}</strong>?{" "}
				</p>
				<p className="text-secondary">
					<em>This action cannot be undone.</em>
				</p>
			</ModalBody>
			<ModalFooter>
				<Button
					variant="secondary"
					onClick={() => {
						handleClose();
					}}
				>
					Cancel
				</Button>
				<Button variant="danger" onClick={() => handleDelete()}>
					Delete
				</Button>
			</ModalFooter>
		</Modal>
  )
}

export default DeleteModal