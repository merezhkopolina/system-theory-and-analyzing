class BookStateManager {
    constructor(book) {
        this.book = book;
        this.state = 'AVAILABLE';
        this.waitingList = [];
        this.stateHistory = [];
        this.addToHistory('AVAILABLE', 'Початковий стан');
    }

    addToHistory(state, reason) {
        this.stateHistory.push({
            state,
            timestamp: new Date(),
            reason
        });
    }

    reserve(member) {
        switch (this.state) {
            case 'AVAILABLE':
                this.state = 'RESERVED';
                this.book.currentHolder = member;
                this.addToHistory('RESERVED', `Зарезервовано для ${member.name}`);
                return true;
            default:
                this.waitingList.push(member);
                this.addToHistory(this.state, `${member.name} додано до списку очікування`);
                return false;
        }
    }

    checkOut() {
        if (this.state === 'RESERVED') {
            this.state = 'CHECKED_OUT';
            this.book.isAvailable = false;
            this.book.dueDate = new Date();
            this.book.dueDate.setDate(this.book.dueDate.getDate() + 14);
            this.addToHistory('CHECKED_OUT', 'Книгу видано');
            return true;
        }
        return false;
    }

    return() {
        if (this.state === 'CHECKED_OUT' || this.state === 'OVERDUE') {
            this.state = 'AVAILABLE';
            this.book.isAvailable = true;
            this.book.currentHolder = null;
            this.book.dueDate = null;
            
            this.addToHistory('AVAILABLE', 'Книгу повернуто');
            
            if (this.waitingList.length > 0) {
                const nextMember = this.waitingList.shift();
                this.reserve(nextMember);
            }
            return true;
        }
        return false;
    }

    checkStatus() {
        if (this.state === 'CHECKED_OUT' && this.book.dueDate < new Date()) {
            this.state = 'OVERDUE';
            this.addToHistory('OVERDUE', 'Термін видачі минув');
        }
        return this.state;
    }

    getStateHistory() {
        return this.stateHistory;
    }
}