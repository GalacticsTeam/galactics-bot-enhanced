import { onFormateDate } from '@handlers/onFormat';

import { birthdayFormatString } from './const';

export const onFormatBirthday = () => (birthday: string | Date) => {
  const formatDate = onFormateDate();

  return formatDate(new Date(birthday), birthdayFormatString);
};
