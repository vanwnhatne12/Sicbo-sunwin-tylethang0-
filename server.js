const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// API gốc
const ORIGINAL_API_URL = "https://sicbosunwin.onrender.com/api/sicbo/sunwin";

// Endpoint chính: proxy & transform
app.get("/api/sicbo", async (req, res) => {
  try {
    const response = await axios.get(ORIGINAL_API_URL);
    const originalData = response.data;

    if (originalData && originalData.data && originalData.data.length > 0) {
      const sourceData = originalData.data[0]; // lấy phiên mới nhất

      // Chuẩn hóa về đúng format yêu cầu
      const transformedData = {
        Id: "tele@idol_vannhat",
        Phien: sourceData.Phien,
        Xuc_xac_1: sourceData.Xuc_xac_1,
        Xuc_xac_2: sourceData.Xuc_xac_2,
        Xuc_xac_3: sourceData.Xuc_xac_3,
        Tong: sourceData.Tong,
        Ket_qua: sourceData.Ket_qua,
        phien_hien_tai: originalData.phien_hien_tai,
        du_doan: originalData.du_doan,
        dudoan_vi: originalData.dudoan_vi,
        do_tin_cay: originalData.do_tin_cay,
        Ghi_chu: originalData.Ghi_chu
      };

      res.status(200).json(transformedData);
    } else {
      res.status(404).json({ error: "Không tìm thấy dữ liệu trong API gốc" });
    }
  } catch (error) {
    console.error("❌ Lỗi khi xử lý yêu cầu:", error.message);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});

// Endpoint root để test server
app.get("/", (req, res) => {
  res.send("✅ API đang hoạt động! Vào /api/sicbo để lấy dữ liệu.");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});      res.status(404).json({ error: "Không tìm thấy dữ liệu trong API gốc" });
    }
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu:", error.message);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
});

// Endpoint root để test server
app.get("/", (req, res) => {
  res.send("✅ API đang hoạt động! Vào /api/sicbo để lấy dữ liệu.");
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại cổng ${PORT}`);
});        res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
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
