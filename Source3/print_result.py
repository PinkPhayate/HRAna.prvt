class Printer(object):
    def __init__(self, rid):
        self.rid = rid
        self.total = 0

    def print_res(self, ticket_type, income, outcome):
        total = (income-outcome)
        print('ticket type:\t\t%s', ticket_type)
        print('income:\t\t\t%d', income)
        print('outcome:\t\t\t%d', outcome)
        print('total:\t\t\t%d', total)
        self.total += total
