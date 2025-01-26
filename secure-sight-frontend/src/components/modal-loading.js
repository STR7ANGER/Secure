import PropTypes from "prop-types"
import { Modal, ModalBody, Spinner } from "reactstrap"

const ModalLoading = ({ isOpen, persistent = false, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      backdrop={ persistent ? 'static' : true }
      centered={true}
      contentClassName="bg-transparent border-0 text-center"
      toggle={onClose}
    >
      <ModalBody>
        <Spinner color="dark" />
      </ModalBody>
    </Modal>
  )
}

ModalLoading.propTypes = {
  isOpen: PropTypes.bool,
  persistent: PropTypes.bool,
  onClose: PropTypes.func
}

export default ModalLoading