using LibraryApp.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace LibraryApp
{
    public static class Utility
    {
        public static User ParseOCRData(string rawMrzString)
        {
            User user = new User();

            try
            {
                List<string> Type1Lines = rawMrzString.Split("\n").ToList();
                string DateOfBirth = Type1Lines[1].Substring(0, 6);
                int checkDigit = int.Parse(Type1Lines[1][6].ToString());
                user.DateOfBirth = DateTime.ParseExact(DateOfBirth, "yyMMdd", CultureInfo.InvariantCulture);
                user.FirstName = Type1Lines[2].Split("<<")[0].Replace('<', ' ').TrimEnd();
                user.LastName = Type1Lines[2].Split("<<")[1].Replace('<', ' ').TrimEnd();
                user.IsValid = CheckDigits(DateOfBirth, checkDigit);
            }
            catch (Exception)
            {
                //log error parsing rawMrzString
            }

            return user;
        }

        public static bool CheckDigits(string digits, int checkDigit)
        {
            //weight 731731...
            List<int> weights = new List<int>() { 7, 3, 1 };
            int result = 0;
            for (int i = 0; i < digits.Length; i++)
            {
                int digit = int.Parse(digits[i].ToString());
                int weight = weights[i % 3];
                result += digit * weight;
            }
            if (result % 10 == checkDigit)
                return true;
            return false;
        }
    }
}
