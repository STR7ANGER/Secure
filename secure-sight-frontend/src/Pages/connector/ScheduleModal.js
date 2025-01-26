import { Schedule } from "@mui/icons-material";
import { Modal, DatePicker, Select } from "antd";

const ScheduleModal = ({ visible, onCancel, onSchedule }) => {
    const handleOk = () => {
        // Perform the schedule operation here
        onSchedule();
    };

    return (
        <Modal
            title="Schedule Connector"
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            // onSchedule={() => {
            //     // Perform the schedule operation, you can access the selectedConnector here
            //     // setScheduleModalVisible(false);
            // }}
        >
            <DatePicker.RangePicker showTime />
            <Select defaultValue="daily" style={{ width: 120, marginTop: "20px" }}>
                <Select.Option value="minute">Minute</Select.Option>
                <Select.Option value="hourly">Hourly</Select.Option>
                <Select.Option value="daily">Daily</Select.Option>
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="quarterly">Quarterly</Select.Option>
                <Select.Option value="yearly">Yearly</Select.Option>
            </Select>
        </Modal>
    );
};

export default ScheduleModal;