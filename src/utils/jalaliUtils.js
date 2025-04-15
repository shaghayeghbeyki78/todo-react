import dayjs from 'dayjs';
import jalali from 'jalaliday';

dayjs.extend(jalali);

export const toJalali = (dateObj) => {
  return dayjs(dateObj).calendar('jalali').locale('fa').format('YYYY/MM/DD');
};
