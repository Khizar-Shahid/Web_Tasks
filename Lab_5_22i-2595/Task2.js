class ConferenceRegistration {
    constructor(maxCapacity = 100) {
        this.attendees = [];
        this.MAX_CAPACITY = maxCapacity;
    }

    // Add a new attendee if there's still space
    addAttendee(name, email, ticketType) {
        if (this.isFull()) {
            console.log("Sorry, the conference has reached maximum capacity (100 attendees).");
            return false;
        }

        // Basic validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            console.log("Error: Name is required.");
            return false;
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            console.log("Error: Valid email is required.");
            return false;
        }
        if (!ticketType || typeof ticketType !== 'string') {
            console.log("Error: Ticket type is required.");
            return false;
        }

        const attendee = {
            name: name.trim(),
            email: email.trim(),
            ticketType: ticketType.trim()
        };

        this.attendees.push(attendee);
        console.log(`Added: ${attendee.name} (${attendee.ticketType})`);
        return true;
    }

    // Check if conference is at full capacity
    isFull() {
        return this.attendees.length >= this.MAX_CAPACITY;
    }

    // List all registered attendees in a formatted way (using forEach)
    listAttendees() {
        if (this.attendees.length === 0) {
            console.log("No attendees registered yet.");
            return;
        }

        console.log(`\nRegistered Attendees (${this.attendees.length}/${this.MAX_CAPACITY}):`);
        console.log("─".repeat(50));

        this.attendees.forEach((attendee, index) => {
            console.log(
                `${String(index + 1).padStart(3, ' ')}. ` +
                `${attendee.name.padEnd(28)} ` +
                `${attendee.email.padEnd(32)} ` +
                `${attendee.ticketType}`
            );
        });

        console.log("─".repeat(50));
    }

    // Count attendees by ticket type (using filter)
    countByTicketType(type) {
        if (!type || typeof type !== 'string') {
            return 0;
        }

        const count = this.attendees.filter(
            attendee => attendee.ticketType.toLowerCase() === type.toLowerCase()
        ).length;

        return count;
    }

    // Optional: nice summary report
    printSummary() {
        console.log("\nConference Registration Summary");
        console.log("───────────────────────────────");
        console.log(`Total registered: ${this.attendees.length}/${this.MAX_CAPACITY}`);
        console.log(`Available spots:  ${this.MAX_CAPACITY - this.attendees.length}`);

        const types = ["General", "VIP", "Speaker"];
        types.forEach(type => {
            const count = this.countByTicketType(type);
            if (count > 0) {
                console.log(`  ${type.padEnd(10)}: ${count}`);
            }
        });

        // Show any other ticket types that were used
        const knownTypes = new Set(types.map(t => t.toLowerCase()));
        this.attendees.forEach(a => {
            if (!knownTypes.has(a.ticketType.toLowerCase())) {
                console.log(`  ${a.ticketType.padEnd(10)}: ${this.countByTicketType(a.ticketType)}`);
            }
        });
    }
}

// ────────────────────────────────────────────────
// Example usage:
const conf = new ConferenceRegistration();

conf.addAttendee("Ayesha Khan", "ayesha.khan@example.com", "VIP");
conf.addAttendee("Bilal Ahmed", "bilal@techbit.pk", "Speaker");
conf.addAttendee("Sara Malik", "sara.malik99@gmail.com", "General");
conf.addAttendee("Zain Raza", "zain.raza@devcon.pk", "General");
conf.addAttendee("Fatima Noor", "fatima.noor@university.edu.pk", "Student");

// Try adding when almost full (just demo - not actually filling 100)
for (let i = 0; i < 10; i++) {
    conf.addAttendee(`Attendee ${i+5}`, `user${i+5}@example.com`, "General");
}

console.log("\nIs conference full?", conf.isFull());

conf.listAttendees();

console.log("\nTicket type counts:");
console.log("General attendees:", conf.countByTicketType("general"));
console.log("VIP attendees:    ", conf.countByTicketType("VIP"));
console.log("Speaker attendees:", conf.countByTicketType("speaker"));
console.log("Student attendees:", conf.countByTicketType("student"));

conf.printSummary();