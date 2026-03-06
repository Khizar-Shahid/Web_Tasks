class WeeklyFitnessTracker {
    constructor(initialData = [4500, 6200, 5800, 7100, 4900, 8300, 6700]) {
        // 7 days (0 = Monday, 6 = Sunday)
        this.steps = [...initialData]; // make a copy of initial data
    }

    // Update steps for a specific day (0-6)
    addSteps(dayIndex, steps) {
        if (dayIndex < 0 || dayIndex > 6) {
            console.error("Invalid day index. Use 0-6.");
            return;
        }
        if (typeof steps !== 'number' || steps < 0) {
            console.error("Steps must be a non-negative number.");
            return;
        }
        this.steps[dayIndex] = steps;
    }

    // Get highest step count
    getHighestSteps() {
        return Math.max(...this.steps);
    }

    // Get lowest step count
    getLowestSteps() {
        return Math.min(...this.steps);
    }

    // Get average steps for the week
    getAverageSteps() {
        const total = this.steps.reduce((sum, steps) => sum + steps, 0);
        return Number((total / 7).toFixed(1));
    }

    // Return array of step counts that are ABOVE weekly average
    getAboveAverageDays() {
        const avg = this.getAverageSteps();
        
        // Using filter to get days (step counts) above average
        const aboveAvgSteps = this.steps.filter(steps => steps > avg);
        
        return aboveAvgSteps;
    }

    // Bonus: nice formatted report
    printReport() {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        console.log("Weekly Fitness Report:");
        console.log("------------------------");
        
        this.steps.forEach((steps, i) => {
            console.log(`${days[i]}: ${steps} steps`);
        });
        
        console.log("------------------------");
        console.log(`Highest: ${this.getHighestSteps()} steps`);
        console.log(`Lowest:  ${this.getLowestSteps()} steps`);
        console.log(`Average: ${this.getAverageSteps()} steps`);
        
        const above = this.getAboveAverageDays();
        console.log(`Days above average (${this.getAverageSteps()}):`);
        console.log(above.length > 0 ? above.join(", ") : "None");
    }
}

// ────────────────────────────────────────────────
// Example usage:
const tracker = new WeeklyFitnessTracker();

// Initial data report
tracker.printReport();

console.log("\nAfter updates:\n");

// Some example updates
tracker.addSteps(0, 12000);     // Monday
tracker.addSteps(4, 3000);      // Friday
tracker.addSteps(5, 9500);      // Saturday

tracker.printReport();

// Individual method examples
console.log("\nIndividual calls:");
console.log("Highest:", tracker.getHighestSteps());
console.log("Lowest:", tracker.getLowestSteps());
console.log("Average:", tracker.getAverageSteps());
console.log("Above average days (step counts):", tracker.getAboveAverageDays());