from abc import *
from datetime import timedelta


class Employee:
    def __init__(self, arg_dict, classification, schedule, method):
        self.emp_id = None
        self.name = None
        self.address = None
        for attr_name, value in arg_dict.items():
            setattr(self, attr_name, value)
        self.classification = classification
        self.schedule = schedule
        self.pay_method = method
        self.affiliation = None  # null object

        if not self.name:
            raise NoNameError
        if not self.address:
            raise NoAddressError

    def set_affiliation(self, affiliation):
        self.affiliation = affiliation

    def is_pay_day(self, date):
        return self.schedule(date)

    def pay_day(self, pc):
        pc.gross_pay = self.classification.calculate_pay(pc)
        pc.deduction = 0  # self.affiliation.calculate_deduction(pc)
        pc.net_pay = pc.gross_pay - pc.deduction
        self.pay_method(pc)


class NoNameError(Exception):
    def __str__(self):
        return "arg에 name이 없습니다"


class NoAddressError(Exception):
    def __str__(self):
        return "arg에 address가 없습니다"


class PaymentClassification(metaclass=ABCMeta):
    def calculate_pay(self, pc):
        pass


class HourlyClassification(PaymentClassification):
    def __init__(self, hourly_rate):
        self.hourly_rate = hourly_rate
        self._time_card_dict = {}

    def get_time_card(self, date):
        if date not in self._time_card_dict:
            raise NoTimeCardError
        return self._time_card_dict[date]

    def add_time_card(self, time_card):
        self._time_card_dict[time_card.date] = time_card

    def calculate_pay(self, pc):
        hours = sum([s.hours for s in self.get_times_for(pc)])
        return hours * self.hourly_rate

    def get_times_for(self, pc):
        end = pc.pay_date
        week = [end - timedelta(days=i) for i in range(7)]
        return [self._time_card_dict.get(d, None)
                for d in week
                if self._time_card_dict.get(d, None)]


class NoTimeCardError(Exception):
    def __str__(self):
        return "date에 time_card가 없습니다"


class CommissionedClassification(PaymentClassification):
    def __init__(self, salary, commission_rate):
        self.salary = salary
        self.commission_rate = commission_rate
        self._sales_dict = {}

    def get_sales(self, date):
        if date not in self._sales_dict:
            raise NoSalesError
        return self._sales_dict[date]

    def add_sales(self, sales):
        self._sales_dict[sales.date] = sales

    def calculate_pay(self, pc):
        sales = sum([s.amount for s in self.get_sales_for(pc)])
        commission = sales * self.commission_rate
        return self.salary + commission

    def get_sales_for(self, pc):
        end = pc.pay_date
        biweek = [end - timedelta(days=i) for i in range(14)]
        return [self._sales_dict.get(d, None)
                for d in biweek
                if self._sales_dict.get(d, None)]


class SalariedClassification(PaymentClassification):
    def __init__(self, salary):
        self.salary = salary

    def calculate_pay(self, pc):
        return self.salary


class NoSalesError(Exception):
    def __str__(self):
        return "date에 sales가 없습니다"

