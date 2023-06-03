export const mappingTranslate = {
  // Enum
  FEMALE: 'Nữ',
  MALE: 'Nam',
  INACTIVATE: 'Chưa kích hoạt',
  ACTIVE: 'Đã kích hoạt',
  SUSPENSION: 'Tạm ngưng/ Khóa tài khoản',
  TEST: 'Test',

  // base
  USER_ALREADY_ACTIVED: 'Tài khoản đã được kích hoạt',
  OTP_EXPIRED: 'Mã OTP đã hết hạn',
  OTP_INVALID: 'Mã OTP không hợp lệ',
  INVALID_OTP_TYPE: 'Loại mã OTP không hợp lệ',
  OTP_TYPE_IS_REQUIRED: 'Loại mã OTP không được để trống',
  USER_NOT_RESET_PASSWORD: 'Tài khoản chưa yêu cầu đổi mật khẩu',
  USERNAME_REQUIRED: 'Tên đăng nhập không được để trống',
  OTP_REQUIRED: 'Mã OTP không được để trống',
  ID_OR_CODE_IS_REQUIRED: 'Id hoặc mã không được để trống',
  IDS_REQUIRE: 'Danh sách id không được để trống',
  CODES_IS_REQUIRED: 'Danh sách code không được để trống',
  NAME_IS_REQUIRED: 'Tên không được để trống',
  NAME_IS_STRING: 'Tên phải là chuỗi ký tự',
  NAME_LENGTH: 'Tên phải từ 1 đến 100 ký tự',
  TITLE_IS_REQUIRED: 'Tiên đề không được để trống',
  TITLE_IS_STRING: 'Tiên đề phải là chuỗi ký tự',
  TITLE_LENGTH: 'Tiên đề phải từ 1 đến 100 ký tự',
  INVALID_STRING: 'Phải là chuỗi ký tự.',
  INVALID_DATE: 'Ngày không đúng định dạng.',
  DESCRIPTION_IS_STRING: 'Mô tả thông tin phải là chuỗi ký tự',
  DESCRIPTION_IS_REQUIRED: 'Mô tả thông tin không được để trống',
  DESCRIPTION_BETWEEN_1_1000_CHARACTERS:
    'Mô tả thông tin phải từ 1 đến 1000 ký tự',
  NOTE_BETWEEN_1_1000_CHARACTERS: 'Ghi chú phải từ 1 đến 1000 ký tự',
  NOTE_IS_STRING: 'Ghi chú phải là chuỗi ký tự',
  SORT_IS_STRING: 'Giá trị sắp xếp phải là chuỗi ký tự',
  SORT_IS_ENUM: 'Giá trị sắp xếp chỉ nhận 1 trong 2 giá trị: ASC, DESC',
  EMAIL_IS_STRING: 'Email phải là chuỗi ký tự',
  EMAIL_INVALID: 'Email không đúng định dạng',
  OLD_EMAIL_IS_STRING: 'Email cũ phải là chuỗi ký tự',
  NEW_EMAIL_IS_STRING: 'Email mới phải là chuỗi ký tự',
  EMAIL_IS_REQUIRED: 'Email không được để trống',
  OLD_EMAIL_INVALID: 'Email cũ không đúng định dạng',
  NEW_EMAIL_INVALID: 'Email mới không đúng định dạng',
  EMAIL_LENGTH: 'Email phải từ 6 đến 100 ký tự',
  NAME_BETWEEN_1_100_CHARACTERS: 'Tên phải từ 1 đến 100 ký tự',
  CODE_BETWEEN_1_10_CHARACTERS: 'Mã phải từ 1 đến 10 ký tự',
  CODE_IS_NUMBER: 'mã phải là số',
  CODE_IS_STRING: 'mã phải là chuỗi ký tự',
  CODE_IS_REQUIRED: 'Mã không được để trống',
  CODE_BETWEEN_1_100_CHARACTERS: 'Mã phải từ 1 đến 100 ký tự',
  KEYWORDS_IS_STRING: 'Từ khóa phải là chuỗi ký tự',
  KEYWORDS_IS_REQUIRED: 'Từ khóa không được để trống',
  IMAGE_IS_STRING: 'url ảnh phải là chuỗi ký tự',
  LIST_ITEM_IS_STRING: 'Id/code trong danh sách phải là chuỗi ký tự',
  LIST_IS_ARRAY: 'Danh sách phải là mảng',
  INTERNAL_SERVER_ERROR: 'Lỗi hệ thống',
  ID_REQUIRED: 'Id không được để trống',
  CODE_REQUIRED: 'Mã không được để trống',
  PHONE_REQUIRED: 'Số điện thoại không được để trống',
  EMAIL_REQUIRED: 'Email không được để trống',
  REFRESH_TOKEN_REQUIRED: 'Refresh token không được để trống',

  // file
  FILE_NOT_FOUND: 'Không tìm thấy file',
  INVALID_FORMAT_IMAGE: 'Định dạng ảnh không hợp lệ',
  INVALID_FORMAT_VIDEO: 'Định dạng video không hợp lệ',
  MAX_SIZE_WARNING: 'Kích thước file quá lớn',

  ALL: 'Tất cả',
  PASSWORD_NEW_NOT_MATCH: 'Mật khẩu xác nhận không đúng.',

  // User 21-30
  OLD_PASSWORD_REQUIRED: 'Mật khẩu cũ không được để trống',
  NEW_PASSWORD_REQUIRED: 'Mật khẩu mới không được để trống',
  CONFIRM_NEW_PASSWORD_REQUIRED: 'Mật khẩu xác nhận không được để trống',
  OLD_PASSWORD_MUST_BE_STRING: 'Mật khẩu cũ phải là chuỗi ký tự',
  NEW_PASSWORD_MUST_BE_STRING: 'Mật khẩu mới phải là chuỗi ký tự',
  NEW_PASSWORD_MIN_6_CHARACTERS: 'Mật khẩu mới phải có ít nhất 6 ký tự',
  CONFIRM_NEW_PASSWORD_MUST_BE_STRING: 'Mật khẩu xác nhận phải là chuỗi ký tự',
  CONFIRM_NEW_PASSWORD_MIN_6_CHARACTERS:
    'Mật khẩu xác nhận phải có ít nhất 6 ký tự',
  PASSWORD_OLD_NOT_MATCH: 'Mật khẩu cũ không đúng.',
  PASSWORD_NEW_SAME_OLD: 'Mật khẩu mới không được trùng với mật khẩu cũ.',
  UNAUTHORIZED: 'Không có quyền truy cập',
  Unauthorized: 'Không có quyền truy cập',
  INVALID_USERNAME_OR_PASSWORD: 'Tên đăng nhập hoặc mật khẩu không đúng.',
  INVALID_PHONE_NUMBER: 'Số điện thoại không đúng định dạng.',
  INVALID_OLD_EMAIL: 'Email cũ không đúng định dạng.',
  INVALID_EMAIL: 'Email không đúng định dạng.',
  USERNAME_ALREADY_EXIST: 'Tên đăng nhập đã tồn tại',
  USER_NOT_FOUND: 'Không tìm thấy tài khoản',
  USER_NOT_ACTIVE: 'Tài khoản chưa được kích hoạt hoặc đã bị khóa',
  EMAIL_ALREADY_EXIST: 'Email đã tồn tại',
  EMAIL_OR_PHONE_REQUIRED: 'Email hoặc số điện thoại không được để trống',
  PASSWORD_IS_REQUIRED: 'Mật khẩu không được để trống',
  PASSWORD_IS_STRING: 'Mật khẩu phải là chuỗi ký tự',
  PASSWORD_IS_MIN_LENGTH_6: 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORD_IS_MAX_LENGTH_255: 'Mật khẩu có tối đa 255 ký tự',
  FULL_NAME_IS_REQUIRED: 'Họ và tên không được để trống',
  FULL_NAME_MUST_BE_STRING: 'Họ và tên phải là chuỗi ký tự',
  FULL_NAME_IS_MIN_LENGTH_1: 'Họ và tên phải có ít nhất 1 ký tự',
  FULL_NAME_IS_MAX_LENGTH_255: 'Họ và tên có tối đa 255 ký tự',
  BIRTHDAY_IS_REQUIRED: 'Ngày sinh không được để trống',
  BIRTHDAY_IS_DATE: 'Ngày sinh phải là ngày tháng',
  PHONE_ALREADY_EXIST: 'Số điện thoại đã tồn tại',
  PHONE_IS_REQUIRED: 'Số điện thoại không được để trống',
  PHONE_IS_STRING: 'Số điện thoại phải là chuỗi ký tự',
  GENDER_IS_REQUIRED: 'Giới tính không được để trống',
  GENDER_IS_STRING: 'Giới tính phảỉ là chuỗi ký tự',
  GENDER_IS_ENUM:
    'Giới tính chỉ nhận 1 trong 3 giá trị sau: MALE, FEMALE, OTHER',
  OTP_IS_STRING: 'Mã OTP phải là chuỗi ký tự',
  OTP_IS_REQUIRED: 'Mã OTP không được để trống',
  SEND_OTP_FAILED: 'Gửi mã OTP thất bại',
  CREATOR_NOT_FOUND: 'Admin không tồn tại',
  CREATOR_IS_INACTIVE: 'tài khoản Admin này không còn hoạt động',
  CREATOR_ID_REQUIRED: 'Id Admin không được để trống',
  OLD_PASSWORD_MISMATCH: 'Mật khẩu không đúng',
  GET_PASSWORD_FAILED: 'Lấy mật khẩu thất bại',

  // staff
  STAFF_NOT_FOUND: 'Không tìm thấy nhân viên',
  IS_MANAGER_IS_ENUM: 'Trạng thái quản lý không hợp lệ',
  USER_NOT_MANAGER: 'Bạn không phải là quản lý',
  PHONE_AND_EMAIL_REQUIRED: 'Số điện thoại và email không được để trống',
  BIRTHDAY_NOT_MORE_THAN_CURRENT_DATE:
    'Ngày sinh không được lớn hơn hoặc ngày hiện tại',
  NOT_DELETE_YOUR_SELF: 'Không thế xoá chính mình',
  NOT_INACTIVE_YOUR_SELF: 'Không thế vô hiệu hoá chính mình',
  NOT_CHANGE_ROLE_YOUR_SELF: 'Không thế thay đổi quyền chính mình',
  IS_ACTIVE_IS_ENUM: 'Trạng thái hoạt động không hợp lệ',

  // customer
  CUSTOMER_NOT_FOUND: 'Không tìm thấy khách hàng',
  CUSTOMER_ID_IS_REQUIRED: 'Mã khách hàng không được để trống',
  CUSTOMER_ID_IS_STRING: 'Mã khách hàng phải là chuỗi ký tự',
  CUSTOMER_ID_MUST_BE_36_CHARACTERS: 'Mã khách hàng phải có 36 ký tự',
  CUSTOMER_ID_IS_ARRAY: 'Mã khách hàng phải là mảng',
  CUSTOMER_NAME_IS_REQUIRED: 'Tên khách hàng không được để trống',
  CUSTOMER_NAME_IS_STRING: 'Tên khách hàng phải là chuỗi ký tự',
  CUSTOMER_STATUS_IS_ENUM: 'Trạng thái khách hàng không hợp lệ',
  CUSTOMER_STATUS_IS_STRING: 'Trạng thái khách hàng phải là chuỗi',

  // customer group
  CUSTOMER_GROUP_NOT_FOUND: 'Không tìm thấy nhóm khách hàng',
  CUSTOMER_GROUP_ID_IS_REQUIRED: 'Id nhóm khách hàng không được để trống',
  CUSTOMER_GROUP_ID_IS_STRING: 'Id nhóm khách hàng phải là chuỗi ký tự',
  CUSTOMER_GROUP_CODE_IS_STRING: 'Mã nhóm khách hàng phải là chuỗi ký tự',
  CUSTOMER_GROUP_NAME_IS_STRING: 'Tên nhóm khách hàng phải là chuỗi ký tự',
  CUSTOMER_GROUP_ID_MUST_BE_36_CHARACTERS:
    'Mã nhóm khách hàng phải có 36 ký tự',
  CUSTOMER_GROUP_HAS_CUSTOMER: 'Nhóm khách hàng vẫn còn khách hàng',
  CUSTOMER_GROUP_CODE_EXIST: 'Mã nhóm khách hàng đã tồn tại',
  CUSTOMER_ALREADY_IN_GROUP: 'Khách hàng đã tồn tại trong nhóm',
  CUSTOMER_NOT_IN_GROUP: 'Khách hàng không thuộc nhóm khách hàng này',
  CUSTOMER_GROUP_HAS_CUSTOMERS: 'Nhóm khách hàng vẫn còn khách hàng',
  CUSTOMER_GROUP_ID_OR_CUSTOMER_GROUP_CODE_REQUIRED:
    'Id nhóm khách hàng hoặc mã nhóm khách hàng không được để trống',

  // image resource
  INVALID_IMAGE_URL: 'url ảnh không đúng định dạng',
  INVALID_IMAGE_RESOURCE: 'Ảnh không đúng định dạng',

  // province
  TO_PROVINCE_CODE_INVALID_NUMBER: 'mã tỉnh thành đi phải là số',
  FROM_PROVINCE_CODE_INVALID_NUMBER: 'mã tỉnh thành đến phải là số',
  FROM_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0:
    'mã tỉnh thành đến phải lớn hơn hoặc bằng 0',
  TO_PROVINCE_CODE_GREATER_THAN_OR_EQUAL_TO_0:
    'mã tỉnh thành đi phải lớn hơn hoặc bằng 0',
  CODENAME_IS_STRING: 'Mã tên phải là chuỗi ký tự',
  CODENAME_BETWEEN_1_255_CHARACTERS: 'Mã tên phải từ 1 đến 255 ký tự',
  PROVINCE_NOT_FOUND: 'Không tìm thấy tỉnh/thành phố',
  CODENAME_IS_REQUIRED: 'Mã tên phải là chuỗi ký tự',
  PROVINCE_CODE_IS_NUMBER: 'mã tỉnh thành phải là số',
  PROVINCE_CODE_IS_REQUIRED: 'mã tỉnh thành phải là số',
  PROVINCE_TYPE_IS_STRING: 'loại tỉnh thành phải là chuỗi ký tự',
  PROVINCE_TYPE_IS_REQUIRED: 'loại tỉnh thành không được để trống',
  PROVINCE_TYPE_BETWEEN_1_50_CHARACTERS:
    'loại tỉnh thành phải từ 1 đến 50 ký tự',
  PROVINCE_CODE_ALREADY_EXIST: 'mã tỉnh/thành phố đã tồn tại',

  // district
  DISTRICT_NOT_FOUND: 'Không tìm thấy quận/huyện',
  DISTRICT_TYPE_IS_STRING: 'Loại quận/huyện phải là chuỗi ký tự',
  DISTRICT_TYPE_LENGTH: 'Loại quận/huyện phải từ 1 đến 50 ký tự',
  DISTRICT_TYPE_REQUIRED: 'Loại quận/huyện không được để trống',
  DISTRICT_CODE_ID_NUMBER: 'Mã quận/huyện phải là số',
  DISTRICT_CODE_ID_REQUIRED: 'Mã quận/huyện không được để trống',
  DISTRICT_CODE_EXISTED: 'Mã quận/huyện đã tồn tại',

  // ward
  WARD_NOT_FOUND: 'Không tìm thấy phường/xã',
  WARD_ID_IS_REQUIRED: 'Id phường/xã không được để trống',
  WARD_ID_IS_NUMBER: 'Id phường/xã phải là số',
  WARD_CODE_MUST_BE_NUMBER: 'Mã phường/xã phải là số',
  WARD_TYPE_IS_STRING: 'Loại phường/xã phải là chuỗi ký tự',
  WARD_TYPE_BETWEEN_1_50_CHARACTERS: 'loại phường/xã phải từ 1 đến 50 ký tự',
  WARD_TYPE_IS_REQUIRED: 'loại phường/xã không được để trống',
  WARD_CODE_ALREADY_EXIST: 'mã phường/xã đã tồn tại',
  WARD_CODE_IS_REQUIRED: 'mã phường/xã không được để trống',

  // station
  STATION_CODE_EXISTED: 'Mã bến xe đã tồn tại ở một bến xe khác',
  FROM_STATION_NOT_FOUND: 'Không tìm thấy bến xe đi',
  FROM_STATION_AND_TO_STATION_IS_SAME:
    'Bến xe đi và bến xe đến không được trùng nhau',
  TO_STATION_NOT_FOUND: 'Không tìm thấy bến xe đến',
  STATION_NOT_FOUND: 'Không tìm thấy bến xe',
  ADDRESS_IS_REQUIRED: 'Địa chỉ không được để trống',
  ADDRESS_MUST_BE_STRING: 'Địa chỉ phải là chuỗi ký tự',
  ADDRESS_BETWEEN_1_255_CHARACTERS: 'Địa chỉ phải từ 1 đến 255 ký tự',

  // seat
  UPDATE_SEAT_FAILED: 'Cập nhật thông tin ghế thất bại',
  SEAT_NOT_FOUND: 'Không tìm thấy thông tin ghế',
  SEAT_TYPE_IS_REQUIRED: 'Loại ghế không được để trống',
  SEAT_TYPE_IS_STRING: 'Loại ghế phải là chuỗi ký tự',
  SEAT_TYPE_IS_ENUM: 'Loại ghế không hợp lệ',
  FLOOR_IS_NUMBER: 'Số tầng phải là số',
  SEAT_CODE_ALREADY_EXIST: 'Mã ghế này đã tồn tại',
  SEAT_FLOOR_MIN_MAX: 'Số tầng chỉ nhận 1 trong 2 giá trị: 1, 2',
  SEAT_ID_IS_STRING: 'Id ghế phải là chuỗi ký tự',
  SEAT_ID_IS_REQUIRED: 'Id ghế không được để trống',
  SEAT_ID_IS_36_CHARACTERS: 'Id ghế phải có 36 ký tự',
  SEAT_IDS_IS_ARRAY: 'danh sách id ghế phải là mảng',
  SEAT_CODE_IS_STRING: 'Mã ghế phải là chuỗi ký tự',
  SEAT_CODE_IS_REQUIRED: 'Mã ghế không được để trống',
  SEAT_CODE_IS_36_CHARACTERS: 'Mã ghế phải có 36 ký tự',
  SEAT_CODES_IS_ARRAY: 'danh sách mã ghế phải là mảng',
  SEAT_IDS_OR_SEAT_CODES_REQUIRED:
    'Danh sách id ghế hoặc danh sách mã ghế không được để trống',
  SEAT_ID_OR_SEAT_CODE_REQUIRED: 'Id ghế hoặc mã ghế không được để trống',
  SEAT_IS_SOLD: 'Ghế này đã được đặt',

  // trip
  TRIP_DETAIL_CODE_OR_TRIP_CODE_REQUIRED:
    'Mã chuyến xe hoặc mã tuyến không được để trống',
  TRIP_HAS_ENDED: 'Tuyến xe này đã kết thúc',
  TRIP_NOT_FOUND: 'Không tìm thấy tuyến xe',
  TRIP_NOT_ACTIVE: 'Tuyến xe này không hoạt động',
  TRIP_IS_ACTIVE: 'Tuyến xe này đang hoạt động',
  TRIP_ID_REQUIRED: 'Id của tuyến đi là không được để trống',
  TRIP_ID_IS_STRING: 'Id của tuyến đi phải là chuỗi ký tự',
  TRIP_ID_INVALID: 'Id của tuyến đi không hợp lệ',
  TRIP_CODE_IS_STRING: 'Mã của tuyến đi phải là chuỗi ký tự',
  TRIP_CODES_IS_REQUIRED: 'Danh sách mã của tuyến đi không được để trống',
  TRIP_CODE_IS_REQUIRED: 'Mã của tuyến đi không được để trống',
  TRIP_CODE_BETWEEN_1_100_CHARACTERS: 'Mã của tuyến đi phải từ 1 đến 100 ký tự',
  TRIP_CODE_EXIST: 'Mã tuyến đi đã tồn tại',
  TRIP_ID_OR_CODE_REQUIRED: 'Id hoặc mã của tuyến đi không được để trống',
  TRIP_START_DATE_INVALID: 'Ngày bắt đầu áp dụng tuyến không đúng định dạng',
  TRIP_END_DATE_INVALID: 'Ngày kết trúc áp dụng tuyến không đúng định dạng',
  START_DATE_GREATER_THAN_NOW: 'Ngày bắt đầu phải lớn hơn ngày hiện tại',
  END_DATE_GREATER_THAN_NOW: 'Ngày kết thúc phải lớn hơn ngày hiện tại',
  END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_NOW:
    'Ngày kết thúc phải lớn hơn hoặc bằng ngày hiện tại',
  END_DATE_MUST_BE_GREATER_THAN_START_DATE:
    'Ngày kết thúc phải lớn hơn ngày bắt đầu',
  END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_START_DATE:
    'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu',
  START_DATE_IS_REQUIRED: 'Ngày bắt đầu không được để trống',
  END_DATE_IS_REQUIRED: 'Ngày kết thúc không được để trống',
  FROM_STATION_ID_IS_REQUIRED: 'Id bến xe đi không được để trống',
  FROM_STATION_CODE_IS_STRING: 'Mã bến xe đi phải là chuỗi ký tự',
  FROM_STATION_ID_IS_STRING: 'Id bến xe đi phải là chuỗi ký tự',
  FROM_STATION_ID_IS_36_CHARACTERS: 'Id bến xe đi phải là 36 ký tự',
  TO_STATION_ID_IS_REQUIRED: 'Id bến xe đi không được để trống',
  TO_STATION_ID_IS_STRING: 'Id bến xe đi phải là chuỗi ký tự',
  TO_STATION_CODE_IS_STRING: 'Mã bến xe đi phải là chuỗi ký tự',
  TO_STATION_ID_IS_36_CHARACTERS: 'Id bến xe đi phải là 36 ký tự',
  TRIP_STATUS_IS_ENUM: 'Trạng thái tuyến đi không hợp lệ',
  TRIP_STATUS_IS_STRING: 'Trạng thái tuyến đi phải là chuỗi ký tự',
  START_DATE_IS_DATE: 'Ngày bắt đầu phải là ngày',
  END_DATE_IS_DATE: 'Ngày kết thúc phải là ngày',
  START_DATE_NOT_MORE_THAN_7_DAYS_FROM_END_DATE:
    'Ngày bắt đầu không được quá 7 ngày so với ngày kết thúc',
  TRAVEL_HOURS_IS_REQUIRED: 'Thời gian di chuyển không được để trống',
  TRAVEL_HOURS_IS_NUMBER: 'Thời gian di chuyển phải là số',
  MIN_TRAVEL_HOURS_IS_NUMBER: 'Thời gian di chuyển tối thiểu phải là số',
  MAX_TRAVEL_HOURS_IS_NUMBER: 'Thời gian di chuyển tối đa phải là số',
  TRAVEL_HOURS_MUST_BE_GREATER_THAN_OR_EQUAL_TO_ONE:
    'Thời gian di chuyển phải lớn hơn hoặc bằng 1',
  TRAVEL_HOURS_TRIP_IS_ACTIVE:
    'Tuyến xe đang hoạt động không thể thay đổi thời gian di chuyển của tuyến',
  TRAVEL_HOURS_GREATER_THAN_1: 'Thời gian di chuyển phải lớn hơn 1 giờ',

  // trip detail
  DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_CURRENT_DATE_PLUS_2_HOURS:
    'Thời gian khởi hành phải lớn hơn hoặc bằng hiện tại + 2 giờ',
  DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TOMORROW:
    'Thời gian khởi hành phải lớn hơn hoặc bằng ngày mai',
  EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_DEPARTURE_DATE_PLUS_2_HOURS:
    'Thời gian đến phải lớn hơn hoặc bằng thời gian khởi hành 2 giờ',
  DEPARTURE_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE:
    'Thời gian khởi hành phải lớn hơn hoặc bằng ngày bắt đầu của tuyến',
  DEPARTURE_DATE_LESS_THAN_OR_EQUAL_TO_TRIP_END_DATE:
    'Thời gian khởi hành phải nhỏ hơn hoặc bằng ngày kết thúc của tuyến',
  EXPECTED_DATE_GREATER_THAN_OR_EQUAL_TO_TRIP_START_DATE:
    'Thời gian đến phải lớn hơn hoặc bằng ngày bắt đầu của tuyến',
  DEPARTURE_TIME_REQUIRED: 'Thời gian khởi hành là không được để trống',
  DEPARTURE_DATE_INVALID: 'Thời gian khởi hành là không đúng định dạng',
  EXPECTED_TIME_REQUIRED: 'Thời gian đến là không được để trống',
  EXPECTED_DATE_GREATER_THAN_DEPARTURE_DATE:
    'Thời gian đến phải lớn hơn hoặc bằng thời gian khởi hành',
  DEPARTURE_DATE_GREATER_THAN_CURRENT_DATE:
    'Thời gian khởi hành phải lớn hơn hiện tại',
  EXPECTED_DATE_GREATER_THAN_CURRENT_DATE:
    'Thời gian đến phải lớn hơn hiện tại',
  INVALID_TRIP_DETAIL_STATUS: 'Trang thái của chuyến không hợp lệ',
  TRIP_DETAIL_STATUS_REQUIRED: 'Trang thái của chuyến không hợp lệ',
  TRIP_DETAIL_NOT_FOUND: 'Không tìm thấy thông tin chuyến đi',
  TRIP_DETAIL_CODE_EXIST: 'Mã chuyến đi đã tồn tại',
  TRIP_DETAIL_CODE_REQUIRED: 'Mã chuyến đi là không được để trống',
  TRIP_DETAIL_CODE_IS_STRING: 'Mã chuyến đi phải là chuỗi ký tự',
  TRIP_DETAIL_CODE_BETWEEN_1_AND_100_CHARACTERS:
    'Mã chuyến đi phải từ 1 đến 100 ký tự',
  TRIP_DETAIL_ID_REQUIRED: 'Id của chuyến xe là không được để trống',
  TRIP_DETAIL_ID_IS_STRING: 'Id của chuyến xe phải là chuỗi ký tự',
  TRIP_DETAIL_ID_IS_36_CHARACTERS: 'Id của chuyến xe phải có 36 ký tự',
  TRIP_DETAIL_HAS_PASSED: 'Chuyến xe đã khởi hành không thể đặt vé',
  TRIP_DETAIL_HAS_PASSED_NOT_PAYMENT:
    'Chuyến xe đã khởi hành không thể thanh toán',
  TRIP_DETAIL_HAS_PASSED_1_HOURS:
    'Chuyến xe còn 1 giờ nữa sẽ khởi hành không thể đặt vé, vui lòng hãy đến phòng vé để được hỗ trợ đặt vé',
  TRIP_DETAIL_NOT_ACTIVE: 'Chuyến xe không còn hoạt động',
  TRIP_DETAIL_HAS_ENDED_NOT_UPDATE: 'Chuyến xe đã khởi hành không thể cập nhật',
  TRIP_HAS_ENDED_NOT_UPDATE: 'Tuyến xe đã kết thúc không thể cập nhật',
  TRIP_DETAIL_HAS_ENDED_NOT_DELETE: 'Chuyến xe đã khởi hành không thể xóa',
  VEHICLE_HAS_BEEN_USED_IN_OTHER_TRIP_DETAIL:
    'Xe đã được sử dụng trong chuyến khác',
  UPDATE_TRIP_DETAIL_FAILED: 'Cập nhật thông tin chuyến xe thất bại',

  // vehicle
  VEHICLE_NOT_FOUND: 'Không tìm thấy xe',
  VEHICLE_ID_REQUIRED: 'Id của xe là không được để trống',
  VEHICLE_ID_IS_STRING: 'Id của xe phải là chuỗi ký tự',
  VEHICLE_ID_INVALID: 'Id của xe không hợp lệ',
  VEHICLE_CODE_REQUIRED: 'Mã của xe là không được để trống',
  VEHICLE_CODE_IS_STRING: 'Mã của xe phải là chuỗi ký tự',
  VEHICLE_CODE_ALREADY_EXIST: 'Mã xe đã tồn tại',
  LICENSE_PLATE_INVALID: 'Biển số xe không hợp lệ',
  LICENSE_PLATE_REQUIRED: 'Biển số xe không được để trống',
  LICENSE_PLATE_STRING: 'Biển số xe phải là chuỗi',
  LICENSE_PLATE_BETWEEN_1_20_CHARACTERS: 'Biển số xe phải có 1 đến 20 ký tự',
  FLOOR_NUMBER_INVALID: 'Số tầng không hợp lệ',
  VEHICLE_TYPE_REQUIRED: 'Loại xe không được để trống',
  VEHICLE_TYPE_STRING: 'Loại xe phải là chuỗi',
  VEHICLE_TYPE_IS_ENUM: 'Loại xe không hợp lệ',
  VEHICLE_FLOOR_NUMBER_IS_NUMBER: 'Số tầng của xe phải là số',
  VEHICLE_FLOOR_NUMBER_MIN_MAX: 'Số tầng của xe chỉ nhận 2 giá trị: 1, 2',
  VEHICLE_TOTAL_SEAT_IS_REQUIRE: 'Tổng số ghế của xe không được để trống',
  VEHICLE_TOTAL_SEAT_IS_NUMBER: 'Tổng số ghế của xe phải là số',
  VEHICLE_TOTAL_SEAT_IS_ENUM:
    'Tổng số ghế của xe phải thuộc 1 trong các giá trị sau: 34, 44, 28',

  // ticket group
  TICKET_GROUP_NOT_FOUND: 'Không tìm thấy nhóm vé',
  TICKET_GROUP_ID_IS_REQUIRED: 'Id của nhóm vé là không được để trống',
  TICKET_GROUP_ID_IS_STRING: 'Id của nhóm vé phải là chuỗi ký tự',
  TICKET_GROUP_ID_IS_36_CHARACTERS: 'Id của nhóm vé phải là 36 ký tự',
  TICKET_GROUP_CODES_IS_REQUIRED: 'Danh sách mã nhóm vé không được để trống',
  TICKET_GROUP_CODE_ITEM_MUST_BE_STRING:
    'Mã nhóm vé trong danh sách phải là chuỗi ký tự',
  TICKET_GROUP_CODES_MUST_BE_ARRAY: 'Danh sách mã nhóm vé phải là mảng',
  TICKET_GROUP_CODE_ALREADY_EXIST: 'Mã nhóm vé đã tồn tại',
  TICKET_GROUP_CODE_MUST_BE_STRING: 'Mã nhóm vé phải là chuỗi ký tự',
  TICKET_GROUP_CODE_IS_REQUIRED: 'Mã của nhóm vé là không được để trống',
  TICKET_GROUP_CODE_MUST_BE_BETWEEN_1_AND_100:
    'Mã nhóm vé phải có 1 đến 100 ký tự',

  // ticket
  TICKET_CODE_EXISTED: 'Mã vé đã tồn tại',
  TICKET_START_DATE_IS_REQUIRED: 'Ngày vé có hiệu lực không được để trống',
  TICKET_START_DATE_GREATER_THAN_CURRENT_DATE:
    'Ngày vé có hiệu lực phải lớn hơn hoặc bằng ngày hiện tại',
  TICKET_END_DATE_IS_REQUIRED: 'Ngày vé hết hiệu lực không được để trống',
  TICKET_END_DATE_GREATER_THAN_TICKET_START_DATE:
    'Ngày vé hết hiệu lực phải lớn hơn ngày vé có hiệu lực',
  TICKET_NOT_FOUND: 'Không tìm thấy thông tin vé',
  TICKET_ID_IS_STRING: 'Id của vé phải là chuỗi ký tự',
  TICKET_ID_IS_REQUIRED: 'Id của vé là không được để trống',
  TICKET_CODE_IS_REQUIRED: 'Mã vé là không được để trống',
  TICKET_CODE_IS_STRING: 'Mã của vé phải là chuỗi ký tự',
  TICKET_CODE_BETWEEN_1_100_CHARACTERS: 'Mã vé phải có 1 đến 100 ký tự',
  TICKET_STATUS_IS_STRING: 'trạng thái của vé phải là chuỗi',
  TICKET_STATUS_IS_ENUM: 'Trạng thái của vé không hợp lệ',
  TICKET_ID_IS_36_CHARACTERS: 'Id của vé phải là 36 ký tự',
  TICKET_DETAIL_IS_SOLD: 'Vé này đã được bán',
  TICKET_GROUP_ID_OR_CODE_REQUIRED:
    'Id hoặc mã của nhóm vé không được để trống',
  UPDATE_TICKET_DETAIL_FAILED: 'Cập nhật thông tin vé thất bại',
  UPDATE_TICKET_DETAIL_FAIL: 'Cập nhật thông tin vé thất bại',

  // price list
  PRICE_LIST_HAS_PRICE_DETAIL: 'Bảng giá này vẫn còn có chi tiết bảng giá',
  PRICE_LIST_IS_ACTIVE_AND_IN_USE:
    'Bảng giá này đang được kích hoạt và đang được sử dụng',
  ANOTHER_PRICE_LIST_IS_EXIST_IN_THIS_DATE:
    'Đã tồn tại bảng giá trong khoảng thời gian này',
  PRICE_LIST_IS_EXPIRED: 'Bảng giá này đã hết hạn',
  PRICE_LIST_IS_ACTIVE: 'Bảng giá này đang được kích hoạt',
  PRICE_LIST_STATUS_INVALID:
    'Trạng thái của bảng giá không hợp lệ. Chỉ nhận 1 trong 2 giá trị: "Kích hoạt", "Tạm ngưng"',
  PRICE_LIST_STATUS_IS_STRING: 'Trạng thái của bảng giá phải là chuỗi ký tự',
  START_DATE_MUST_BE_LESS_THAN_END_DATE:
    'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc',
  PRICE_LIST_NOT_FOUND: 'Không tìm thấy bảng giá',
  PRICE_LIST_CODE_IS_STRING: 'Mã của bảng giá phải là chuỗi ký tự',
  PRICE_LIST_ID_IS_STRING: 'Id của bảng giá phải là chuỗi ký tự',
  PRICE_LIST_ID_IS_REQUIRED: 'Id của bảng giá không được để trống',
  PRICE_LIST_ID_IS_36_CHARACTERS: 'Id của bảng giá phải là 36 ký tự',
  PRICE_LIST_ID_OR_CODE_REQUIRED: 'Id hoặc mã của bảng giá không được để trống',
  PRICE_LIST_CODE_IS_EXIST: 'mã của bảng giá đã tồn tại',
  TRIP_EXISTED_IN_PRICE_LIST:
    'Loại ghế của tuyến này đã tồn tại trong bảng giá đang hoạt động khác',
  // price details
  PRICE_DETAIL_NOT_FOUND: 'Không tìm thấy giá vé',
  PRICE_IS_NUMBER: 'Giá phải là số',
  MAX_PRICE_IS_NUMBER: 'Giá tối đa phải là số',
  MIN_PRICE_IS_NUMBER: 'Giá tối thiểu phải là số',
  PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0: 'Giá phải lớn hơn hoặc bằng 0',
  MAX_PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0:
    'Giá tối đa phải lớn hơn hoặc bằng 0',
  MIN_PRICE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0:
    'Giá tối thiểu phải lớn hơn hoặc bằng 0',
  PRICE_IS_TOO_BIG: 'Giá lớn hơn miền giá trị của double',
  PRICE_DETAIL_CODE_EXISTED: 'Mã chi tiết giá đã tồn tại',
  PRICE_MUST_GREATER_THAN_ZERO: 'Giá phải lớn hơn 0',
  PRICE_MUST_REQUIRED: 'Giá không được để trống',

  // promotion
  PROMOTION_HAS_EXPIRED: 'Chương trình khuyến mãi này đã hết hạn',
  PROMOTION_IS_OUT_OF_BUDGET: 'Chương trình khuyến mãi này đã hết ngân sách',
  PROMOTION_IS_ACTIVE_AND_IN_USE:
    'Chương trình khuyến mãi này đang được kích hoạt và đang được sử dụng',
  USE_BUDGET_IS_NUMBER: 'Ngân sách đã dùng phải là số',
  USE_BUDGET_MUST_BE_GREATER_THAN_0: 'Ngân sách đã dùng phải lớn hơn 0',
  MIN_OF_MAX_BUDGET_IS_NUMBER: 'Số tối thiểu của ngân sách tối đa phải là số',
  MIN_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0:
    'Số tối thiểu của ngân sách tối đa phải lớn hơn hoặc bằng 0',
  MAX_OF_MAX_BUDGET_IS_NUMBER: 'Số tối đa của ngân sách tối đa phải là số',
  MAX_OF_MAX_BUDGET_MUST_BE_GREATER_THAN_0:
    'Số tối đa của ngân sách tối đa phải lớn hơn hoặc bằng 0',
  MAX_BUDGET_IS_REQUIRED: 'Ngân sách tối đa không được để trống',
  MAX_BUDGET_IS_NUMBER: 'Ngân sách tối đa phải là số',
  MAX_BUDGET_MUST_BE_GREATER_THAN_0:
    'Ngân sách tối đa phải lớn hơn hoặc bằng 0',
  MIN_USE_BUDGET_IS_NUMBER: 'Ngân sách đã sử dụng tối thiểu phải là số',
  MIN_USE_BUDGET_MUST_BE_GREATER_THAN_0:
    'Ngân sách đã sử dụng tối thiểu phải lớn hơn hoặc bằng 0',
  MAX_USE_BUDGET_MUST_BE_GREATER_THAN_0:
    'Ngân sách đã sử dụng tối đa phải lớn hơn hoặc bằng 0',
  MAX_USE_BUDGET_IS_NUMBER: 'Ngân sách đã sử dụng tối đa phải là số',
  MAX_BUDGET_MUST_BE_DOUBLE: 'Ngân sách tối đa phải là kiểu double',
  BUDGET_IS_REQUIRED: 'Ngân sách không được để trống',
  BUDGET_IS_NUMBER: 'Ngân sách phải là số',
  BUDGET_MUST_BE_INT: 'Ngân sách phải là số nguyên',
  MAX_BUDGET_MUST_BE_GREATER_THAN_USED_BUDGET:
    'Ngân sách tối đa phải lớn hơn ngân sách đã dùng',
  PROMOTION_STATUS_IS_ON_ACTIVE:
    'Chương trình khuyến mãi đang kích hoạt nên không thể cập nhật ngày bắt đầu',
  PROMOTION_NOT_FOUND: 'Không tìm thấy chương trình khuyến mãi',
  PROMOTION_CODE_EXISTED: 'Mã khuyến mãi đã tồn tại',
  PROMOTION_STATUS_IS_STRING:
    'Trạng thái chương trình khuyến mãi phải là chuỗi ký tự',
  PROMOTION_STATUS_IS_REQUIRED:
    'Trạng thái chương trình khuyến mãi không được để trống',
  PROMOTION_STATUS_IS_ENUM:
    'Trạng thái chương trình khuyến mãi phải thuộc 1 trong các loại sau: "Đang hoạt động", "Ngừng hoạt động"',
  USE_QUANTITY_IS_NUMBER: 'Số lượng đã dùng phải là số',
  MIN_USE_QUANTITY_IS_NUMBER: 'Số lượng đã dùng tối thiểu phải là số',
  MAX_USE_QUANTITY_IS_NUMBER: 'Số lượng đã dùng tối đa phải là số',
  USE_QUANTITY_MIN_0: 'Số lượng đã dùng phải lớn hơn hoặc bằng 0',
  MIN_USE_QUANTITY_MIN_0: 'Số lượng đã dùng tối thiểu phải lớn hơn hoặc bằng 0',
  MAX_USE_QUANTITY_MIN_0: 'Số lượng đã dùng tối đa phải lớn hơn hoặc bằng 0',
  MAX_OF_MAX_QUANTITY_IS_NUMBER:
    'Số tối đa của số lượng áp dụng tối đa phải là số',
  MIN_OF_MAX_QUANTITY_IS_NUMBER:
    'Số tối thiểu của số lượng áp dụng tối đa phải là số',
  MAX_OF_MAX_QUANTITY_MIN_0:
    'Số tối đa của số lượng áp dụng tối đa phải lớn hơn hoặc bằng 0',
  MIN_OF_MAX_QUANTITY_MIN_0:
    'Số tối thiểu của số lượng áp dụng tối đa phải lớn hơn hoặc bằng 0',
  MAX_QUANTITY_MIN_1: 'Số lượng tối đa phải lớn hơn hoặc bằng 1',
  MAX_QUANTITY_MIN_0: 'Số lượng tối đa phải lớn hơn hoặc bằng 0',
  MAX_QUANTITY_IS_REQUIRED: 'Số lượng tối đa không được để trống',
  MAX_QUANTITY_IS_NUMBER: 'Số lượng tối đa phải là số',
  MAX_QUANTITY_MUST_BE_INTEGER: 'Số lượng tối đa phải là số nguyên',
  MAX_QUANTITY_MUST_BE_GREATER_THAN_USED_QUANTITY:
    'Số lượng tối đa phải lớn hơn số lượng đã dùng',
  MAX_QUANTITY_MUST_BE_GREATER_THAN_0: 'Số lượng áp dụng tối đa phải lớn hơn 0',
  MAX_QUANTITY_PER_CUSTOMER_MIN_1:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn hoặc bằng 1',
  MAX_QUANTITY_PER_CUSTOMER_MIN_0:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn hoặc bằng 0',
  MAX_QUANTITY_PER_CUSTOMER_MUST_BE_INTEGER:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải 1 số nguyên',
  MAX_QUANTITY_PER_CUSTOMER_IS_REQUIRED:
    'Số lượng tối đa áp dụng cho mỗi khách hàng không được để trống',
  MAX_QUANTITY_PER_CUSTOMER_IS_NUMBER:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải là số',
  MAX_QUANTITY_PER_CUSTOMER_MUST_BE_GREATER_THAN_USED_QUANTITY_PER_CUSTOMER:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn hoặc bằng số lượng cũ',
  MAX_QUANTITY_PER_CUSTOMER_MUST_BE_GREATER_THAN_0:
    'Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn 0',
  MAX_QUANTITY_PER_CUSTOMER_PER_DAY_IS_REQUIRED:
    'Số lượng tối đa áp dụng cho mỗi khách hàng mỗi ngày không được để trống',
  MAX_QUANTITY_PER_CUSTOMER_PER_DAY_IS_NUMBER:
    'Số lượng tối đa áp dụng cho mỗi khách hàng mỗi ngày phải là số',
  MAX_QUANTITY_PER_CUSTOMER_PER_DAY_MUST_BE_GREATER_THAN_0:
    'Số lượng tối đa áp dụng cho mỗi khách hàng mỗi ngày phải lớn hơn 0',
  MAX_QUANTITY_PER_CUSTOMER_PER_DAY_MIN_1:
    'Số lượng tối đa áp dụng cho mỗi khách hàng mỗi ngày phải lớn hơn hoặc bằng 1',
  PROMOTION_ID_IS_REQUIRED:
    'Id của chương trình khuyến mãi không được để trống',
  PROMOTION_ID_IS_36_CHARACTERS:
    'Id của chương trình khuyến mãi phải là 36 ký tự',
  PROMOTION_ID_IS_STRING: 'Id của chương trình khuyến mãi phải là chuỗi ký tự',
  MIN_OF_MAX_QUANTITY_PER_CUSTOMER_IS_NUMBER:
    'Số tổi thiểu của Số lượng tối đa áp dụng cho mỗi khách hàng phải là số',
  MIN_OF_MAX_QUANTITY_PER_CUSTOMER_MIN_0:
    'Số tổi thiểu của Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn hoặc bằng 0',
  MAX_OF_MAX_QUANTITY_PER_CUSTOMER_IS_NUMBER:
    'Số tổi đa của Số lượng tối đa áp dụng cho mỗi khách hàng phải là số',
  MAX_OF_MAX_QUANTITY_PER_CUSTOMER_MIN_0:
    'Số tổi đa của Số lượng tối đa áp dụng cho mỗi khách hàng phải lớn hơn hoặc bằng 0',

  // promotion line
  PROMOTION_LINE_CODES_IS_REQUIRED:
    'Danh sách mã khuyến mãi không được để trống',
  PROMOTION_LINE_HAS_EXPIRED: 'Khuyến mãi đã hết hạn',
  PROMOTION_LINE_NOT_FOUND: 'Không tìm thấy khuyến mãi',
  PROMOTION_LINE_CODE_IS_REQUIRED: 'Mã khuyến mãi không được để trống',
  PROMOTION_LINE_CODE_IS_STRING: 'Mã khuyến mãi phải là chuỗi ký tự',
  PROMOTION_LINE_CODES_IS_ARRAY: 'Mã khuyến mãi phải là mảng',
  PROMOTION_LINE_CODES_IS_STRING:
    'thành phần trong danh sách mã khuyến mãi phải là chuỗi ký tự',
  PROMOTION_LINE_TYPE_IS_STRING: 'Loại khuyến mãi phải là chuỗi ký tự',
  PROMOTION_LINE_TYPE_IS_REQUIRED: 'Loại khuyến mãi không được để trống',
  PROMOTION_LINE_TYPE_IS_ENUM:
    'Loại khuyến mãi phải thuộc 1 trong các loại sau: "Giảm giá sản phẩm (bằng tiền trực tiếp)", "Giảm giá sản phẩm (bằng phần trăm)"',
  PROMOTION_LINE_CODE_ALREADY_EXIST: 'Mã khuyến mãi đã tồn tại',
  PROMOTION_CODE_IS_REQUIRED: 'Mã khuyến mãi không được để trống',
  COUPON_CODE_IS_REQUIRED: 'Mã coupon không được để trống',
  COUPON_CODE_IS_STRING: 'Mã coupon phải là chuỗi ký tự',
  COUPON_CODE_BETWEEN_1_100_CHARACTERS: 'Mã voucher phải có từ 1-100 ký tự',
  PROMOTION_LINE_COUPON_CODE_ALREADY_EXIST: 'Mã voucher khuyến mãi đã tồn tại',
  PROMOTION_LINE_IS_ACTIVE: 'Khuyến mãi đang được sử dụng',
  START_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_PROMOTION_START_DATE:
    'Ngày bắt đầu phải lớn hơn hoặc bằng ngày bắt đầu của chương trình khuyến mãi',
  START_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE:
    'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc của chương trình khuyến mãi',
  END_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_END_DATE:
    'Ngày kết thúc phải nhỏ hơn hoặc bằng ngày kết thúc của chương trình khuyến mãi',
  END_DATE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_PROMOTION_START_DATE:
    'Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu của chương trình khuyến mãi',
  START_DATE_MUST_BE_LESS_THAN_OR_EQUAL_TO_PROMOTION_LINE_END_DATE:
    'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc của khuyến mãi',

  // promotion detail
  PROMOTION_DETAIL_NOT_CREATED: 'Không thể tạo chi tiết khuyến mãi',
  PROMOTION_DETAIL_NOT_FOUND: 'Không tìm thấy chi tiết khuyến mãi',
  PROMOTION_DETAIL_ID_MUST_BE_STRING:
    'Id chi tiết khuyến mãi phải là chuỗi ký tự',
  PROMOTION_DETAIL_ID_IS_REQUIRED: 'Id chi tiết khuyến mãi không được để trống',
  PROMOTION_DETAIL_ID_MUST_BE_BETWEEN_1_AND_100_CHARACTERS:
    'Id chi tiết khuyến mãi phải có từ 1-100 ký tự',
  QUANTITY_BUY_MUST_BE_INTEGER: 'Số lượng mua phải là số nguyên',
  QUANTITY_BUY_MUST_BE_GREATER_THAN_0: 'Số lượng mua phải lớn hơn 0',
  QUANTITY_BUY_IS_REQUIRED: 'Số lượng mua không được để trống',
  PURCHASE_AMOUNT_MUST_BE_INT: 'Số tiền mua phải là số nguyên',
  PURCHASE_AMOUNT_IS_REQUIRED: 'Số tiền mua không được để trống',
  PURCHASE_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0:
    'Số tiền mua phải lớn hơn hoặc bằng 0',
  REDUCTION_AMOUNT_IS_INT: 'Số tiền được giảm phải là số nguyên',
  REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0:
    'Số tiền được giảm phải lớn hơn hoặc bằng 0',
  REDUCTION_PERCENT_IS_INT: 'Phần trăm được giảm phải là số nguyên',
  REDUCTION_AMOUNT_IS_REQUIRED: 'Số tiền được giảm không được để trống',
  REDUCTION_PERCENT_GREATER_THAN_OR_EQUAL_TO_0:
    'Phần trăm được giảm phải lớn hơn hoặc bằng 0',
  MAX_REDUCTION_AMOUNT_MUST_BE_INT:
    'Số tiền được giảm tối đa phải là số nguyên',
  MAX_REDUCTION_AMOUNT_IS_REQUIRED:
    'Số tiền được giảm tối đa không được để trống',
  MAX_REDUCTION_AMOUNT_GREATER_THAN_OR_EQUAL_TO_0:
    'Số tiền được giảm tối đa phải lớn hơn hoặc bằng 0',
  PERCENT_DISCOUNT_IS_INT: 'Phần trăm được giảm phải là số nguyên',
  PERCENT_DISCOUNT_IS_REQUIRED: 'Phần trăm được giảm không được để trống',
  PERCENT_DISCOUNT_GREATER_THAN_OR_EQUAL_TO_0:
    'Phần trăm được giảm phải lớn hơn hoặc bằng 0',
  PERCENT_DISCOUNT_LESS_THAN_OR_EQUAL_TO_100:
    'Phần trăm được giảm phải nhỏ hơn hoặc bằng 100',
  QUANTITY_RECEIVE_IS_INT: 'Số lượng được tặng phải là số nguyên',
  QUANTITY_RECEIVE_IS_REQUIRED: 'Số lượng được tặng không được để trống',
  QUANTITY_RECEIVE_MUST_BE_GREATER_THAN_OR_EQUAL_TO_1:
    'Số lượng được tặng phải lớn hơn hoặc bằng 1',
  QUANTITY_BUY_OR_PURCHASE_AMOUNT_IS_REQUIRED:
    'Số lượng vé mua tối thiểu hoặc số tiền mua tối thiểu không được để trống',
  MIN_QUANTITY_BUY_IS_NUMBER: 'Số lượng vé mua tối thiểu phải là số',
  MIN_PURCHASE_AMOUNT_IS_NUMBER: 'Số tiền mua tối thiểu phải là số',

  // order
  ORDER_NOT_FOUND: 'Không tìm thấy hoá đơn',
  ORDER_ALREADY_CANCEL: 'Hoá đơn đã bị hủy',
  ORDER_ALREADY_PAID: 'Hoá đơn đã thanh toán',
  ORDER_ALREADY_RETURNED: 'Hoá đơn đã huỷ và trả lại vé',
  ORDER_NOT_PAID: 'Hoá đơn chưa thanh toán',
  ORDER_NOT_BELONG_TO_USER: 'Hoá đơn không thuộc về người dùng',
  ORDER_CODE_IS_REQUIRED: 'Mã đơn hàng không được để trống',
  ORDER_CODE_MUST_BE_STRING: 'Mã đơn hàng phải là chuỗi ký tự',
  ORDER_STATUS_IS_STRING: 'Trạng thái của đơn hàng phải là chuỗi ký tự',
  ORDER_STATUS_IS_ENUM: 'Trạng thái của đơn hàng không hợp lệ',
  ORDER_ID_IS_36_CHARACTERS: 'Id của đơn hàng phải là 36 ký tự',
  ORDER_ID_IS_REQUIRED: 'Id của đơn hàng không được để trống',
  ORDER_ID_IS_STRING: 'Id của đơn hàng phải là chuỗi ký tự',
  ORDER_DETAIL_NOT_FOUND: 'Không tìm thấy chi tiết đơn hàng',
  CREATE_ORDER_DETAIL_FAILED: 'Tạo chi tiết hoá đơn thất bại',
  ORDER_IS_CANCELLED: 'Đơn hàng đã bị hủy',
  ORDER_IS_PAID: 'Đơn hàng đã thanh toán',
  ORDER_IS_PENDING: 'Đơn hàng đang chờ xử lý',
  ORDER_IS_RETURNED: 'Đơn hàng đã được hoàn trả',
  CREATE_ORDER_FAILED: 'Tạo hoá đơn thất bại',
  MIN_FINAL_TOTAL_IS_NUMBER: 'Tổng tiền tối thiểu phải là số',
  MAX_FINAL_TOTAL_IS_NUMBER: 'Tổng tiền tối đa phải là số',
  ORDER_CODE_BETWEEN_1_100_CHARACTERS: 'Mã đơn hàng phải có từ 1-100 ký tự',
  ORDER_CANNOT_CANCEL_12H_BEFORE:
    'Không thể huỷ vé trước 12 tiếng so với giờ khởi hàng, hãy đến trực tiếp phòng vé để huỷ',
  ORDER_CANNOT_CANCEL_AFTER_DEPARTURE:
    'Không thể huỷ vé sau khi chuyến xe đã khởi hành',
  ORDER_CANNOT_PAYMENT_AFTER_DEPARTURE:
    'Không thể thanh toán sau khi chuyến xe đã khởi hành',

  // promotion history
  PROMOTION_HISTORY_NOT_FOUND: 'Không tìm thấy lịch sử khuyến mãi',
  PROMOTION_HISTORY_TYPE_IS_REQUIRED:
    'Loại lịch sử khuyến mãi không được để trống',
  PROMOTION_HISTORY_TYPE_IS_ENUM: 'Loại lịch sử khuyến mãi không hợp lệ',
  AMOUNT_IS_REQUIRED: 'Số tiền không được để trống',
  AMOUNT_IS_NUMBER: 'Số tiền phải là số',
  QUANTITY_IS_REQUIRED: 'Số lượng không được để trống',
  QUANTITY_IS_NUMBER: 'Số lượng phải là số',
  QUANTITY_MUST_BE_INTEGER: 'Số lượng phải là số nguyên',
  QUANTITY_MUST_BE_GREATER_THAN_0: 'Số lượng phải lớn hơn 0',
  NUMBER_OF_TICKET_IS_NOT_ENOUGH: 'số lượng vé không đủ để áp dụng khuyến mãi',
  TOTAL_AMOUNT_IS_NOT_ENOUGH: 'Tổng tiền không đủ để áp dụng khuyến mãi',
  PROMOTION_HAS_OUT_OF_BUDGET: 'Khuyến mãi đã hết ngân sách',
  TOTAL_MUST_BE_NUMBER: 'Tổng tiền phải là số',
  TOTAL_IS_REQUIRED: 'Tổng tiền không được để trống',
  NUMBER_OF_TICKET_IS_REQUIRED: 'Số lượng vé không được để trống',
  NUMBER_OF_TICKET_MUST_BE_INTEGER: 'Số lượng vé phải là số nguyên lớn hơn 0',
  ORDER_STATUS_NOT_REQUIRED: 'Trạng thái hoá đơn không được để trống',
  PAYMENT_METHOD_NOT_FOUND: 'Không tìm thấy phương thức thanh toán',
  PAYMENT_METHOD_IS_REQUIRED: 'Phương thức thanh toán không được để trống',
  PAYMENT_METHOD_IS_ENUM: 'Phương thức thanh toán không hợp lệ',
  PAYMENT_METHOD_NOT_ZALOPAY: 'Phương thức thanh toán không phải là zalopay',

  // order refund
  CREATE_ORDER_REFUND_DETAIL_FAILED: 'Tạo hoá đơn hoàn trả thất bại',
  CREATE_ORDER_REFUND_FAILED: 'Tạo hoá đơn hoàn trả thất bại',
  ORDER_REFUND_NOT_FOUND: 'Không tìm thấy hoá đơn hoàn trả',
  ORDER_REFUND_STATUS_IS_ENUM: 'Trạng thái hoá đơn hoàn trả không hợp lệ',

  // otp
  SEND_SMS_FAILED: 'Gửi sms thất bại',
  SEND_EMAIL_FAILED: 'Gửi email thất bại',

  // statistic
  STATISTICS_TYPE_MUST_BE_WEEK_OR_MONTH:
    'Loại thống kê phải là tuần hoặc tháng',
  LIMIT_MUST_BE_NUMBER: 'Số lượng người cần lấy phải là số',
  START_DATE_OR_END_DATE_IS_REQUIRED:
    'Ngày bắt đầu và ngày kết thúc không được để trống',

  // payment
  CONNECT_ZALOPAY_FAIL: 'Kết nối với ZaloPay thất bại',
  APP_TRANS_ID_REQUIRED: 'AppTransId không được để trống',
  APP_TRANS_ID_STRING: 'AppTransId phải là chuỗi ký tự',
  APP_TIME_MUST_BE_NUMBER: 'AppTime phải là số',
  APP_TIME_MUST_BE_STRING: 'AppTime phải là chuỗi ký tự',
  APP_TIME_ID_REQUIRED: 'AppTimeId không được để trống',
  ZALO_TRANS_ID_REQUIRED: 'ZaloTransId không được để trống',
  ZALO_TRANS_ID_STRING: 'ZaloTransId phải là chuỗi ký tự',
  PAYMENT_TIME_ID_REQUIRED: 'PaymentTimeId không được để trống',
  PAYMENT_TIME_ID_STRING: 'PaymentTimeId phải là chuỗi ký tự',
  PAYMENT_FAILED: 'Thanh toán thất bại',
  PAYMENT_FAIL: 'Thanh toán thất bại',
  PAYMENT_NOT_COMPLETE: 'Chưa thực hiện thanh toán',
  TRANSACTION_ID_REQUIRED: 'Hoá đơn này chưa từng được thanh toán',
  AMOUNT_IS_NOT_EMPTY: 'Số tiền không được để trống',
  AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0: 'Số tiền phải lớn hơn hoặc bằng 0',

  // payment history
  PAYMENT_HISTORY_NOT_FOUND: 'Không tìm thấy lịch sử thanh toán',
  PAYMENT_HISTORY_CODE_IS_REQUIRED: 'Mã thanh toán không được để trống',
  ZALO_TRANS_ID_IS_REQUIRED: 'ZaloTransId không được để trống',
  PAYMENT_HISTORY_STATUS_IS_ENUM: 'Trạng thái thanh toán không hợp lệ',
  PAYMENT_TIME_IS_DATE: 'PaymentTime phải là ngày tháng',
  PAYMENT_HISTORY_IS_SUCCESS: 'lần thanh toán này đã thành công',
  PAYMENT_HISTORY_IS_FAILED: 'lần thanh toán này đã thất bại',
  PAYMENT_HISTORY_TYPE_IS_REQUIRED:
    'Loại Lịch sử thanh toán DTO không được để trống',
  PAYMENT_HISTORY_TYPE_IS_ENUM: 'Loại Lịch sử thanh toán DTO không hợp lệ',
  PAYMENT_HISTORY_ID_IS_REQUIRED: 'Id Lịch sử thanh toán không được để trống',
  CUSTOMER_CODE_IS_STRING: 'Mã khách hàng phải là chuỗi ký tự',
  STAFF_CODE_IS_STRING: 'Mã nhân viên phải là chuỗi ký tự',
  FROM_DATE_PAYMENT_TIME_IS_DATE: 'Từ ngày thanh toán phải là ngày tháng',
  TO_DATE_PAYMENT_TIME_IS_DATE: 'Đến ngày thanh toán phải là ngày tháng',
  MIN_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0:
    'Số tiền tối thiểu phải lớn hơn hoặc bằng 0',
  MAX_AMOUNT_MUST_BE_GREATER_THAN_OR_EQUAL_TO_0:
    'Số tiền tối đa phải lớn hơn hoặc bằng 0',
  PAYMENT_HISTORY_NOT_SUCCESS: 'Thanh toán hoá đơn này chưa thành công',

  // cron job
  SECRET_KEY_IS_NOT_VALID: 'secret key không hợp lệ',
};
