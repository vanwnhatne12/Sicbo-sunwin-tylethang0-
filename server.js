const express = require('express');
const axios = require('axios');

const app = express();
// Render tự động cung cấp biến PORT, chúng ta chỉ cần sử dụng nó
const PORT = process.env.PORT || 3000;

const ORIGINAL_API_URL = "https://sicbosunwin.onrender.com/api/sicbo/sunwin";

// Endpoint chính của API
app.get('/api/sicbo', async (req, res) => {
    try {
        const response = await axios.get(ORIGINAL_API_URL);
        const originalData = response.data;

        if (originalData && originalData.data && originalData.data.length > 0) {
            const sourceData = originalData.data[0]; 

            const transformedData = {
                "session": sourceData.Phien,
                "total": sourceData.Tong,
                "result": sourceData.Ket_qua,
                "next_session": originalData.phien_hien_tai,
                "predict": originalData.du_doan,
                "doan_vi": originalData.dudoan_vi,
                "thanh_cong": originalData.do_tin_cay,
                "id": "tele@idol_vannhat"
            };

            res.status(200).json(transformedData);
        } else {
            res.status(404).json({ error: "Không tìm thấy dữ liệu trong API gốc" });
        }
    } catch (error) {
        // Ghi lại lỗi ra console của Render để bạn có thể xem log
        console.error("Lỗi khi xử lý yêu cầu:", error.message);
        res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
    }
});

// Endpoint gốc để kiểm tra API có hoạt động không
app.get('/', (req, res) => {
    res.send('API đang hoạt động! Truy cập /api/sicbo để lấy dữ liệu.');
});


// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại cổng ${PORT}`);
});
