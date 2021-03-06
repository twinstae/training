import unittest
from datetime import date

from Employee import HourlyClassification, NoTimeCardError
from PayrollDB import PayrollDB as DB, NoEmployeeError
from TimeCard import TimeCard
from Tranaction import add_hourly_employee_transaction, add_time_card_transaction


class TestTimeCard(unittest.TestCase):
    def new_employee(self, arg_dict, add_employee):
        transaction = add_employee(arg_dict)
        transaction()
        employee = DB.get_employee(arg_dict['emp_id'])
        for attr_name, attr_value in arg_dict.items():
            self.assertTrue(getattr(employee, attr_name) == attr_value)
        return employee

    def setUp(self) -> None:
        self.arg_dict = {
            'emp_id': 1,
            'name': "김태희",
            'address': "파주",
            'hourly_rate': 1.0
        }
        self.employee = self.new_employee(
            arg_dict=self.arg_dict,
            add_employee=add_hourly_employee_transaction
        )

        self.hc = self.employee.classification
        self.assertIsInstance(self.hc, HourlyClassification)

    def tearDown(self) -> None:
        DB.clear()

    def test_add_and_get_time_card(self):
        transaction = add_time_card_transaction(
            emp_id=self.arg_dict['emp_id'],
            date=date(2001, 10, 31),
            hours=8.0
        )
        transaction()

        tc = self.hc.get_time_card(date(2001, 10, 31))
        self.assertIsInstance(tc, TimeCard)
        self.assertEqual(tc.hours, 8.0)

    def test_add_and_get_wrong_time_card(self):
        with self.assertRaises(NoEmployeeError):
            transaction = add_time_card_transaction(
                emp_id=987,
                date=date(2001, 10, 31),
                hours=8.0
            )
            transaction()

        with self.assertRaises(NoTimeCardError):
            tc = self.hc.get_time_card(date(9999, 10, 31))


if __name__ == '__main__':
    unittest.main()
