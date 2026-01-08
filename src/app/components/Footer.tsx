import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ShopStyle</h3>
            <p className="text-sm mb-4">
              Thời trang hiện đại, chất lượng cao cho mọi phong cách.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên Kết</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Sản Phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Chính Sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên Hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>0123 456 789</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>contact@shopstyle.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Nhận Tin</h4>
            <p className="text-sm mb-4">
              Đăng ký để nhận thông tin về sản phẩm mới và ưu đãi.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-green-500"
              />
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                Gửi
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2026 ShopStyle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
