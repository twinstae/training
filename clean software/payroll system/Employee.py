class Employee:
    def __init__(self,emp_id, name, address):
        self.emp_id = emp_id
        self.name = name
        self.address = address


class PaymentClassification:
    pass


class HourlyClassification(PaymentClassification):
    def __init__(self, hourly_rate):
        self.hourly_rate = hourly_rate


class CommissionedClassification(PaymentClassification):
    def __init__(self, salary, commission_rate):
        self.hourly_rate = salary
        self.commission_rate = commission_rate


class SalariedClassification(PaymentClassification):
    def __init__(self, salary):
        self.hourly_rate = salary
