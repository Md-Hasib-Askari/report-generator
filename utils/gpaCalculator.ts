export const calculateGPA = (marks: number): number => {
    if (marks >= 80) return 4.0;
    if (marks >= 70) return 3.5;
    if (marks >= 60) return 3.0;
    if (marks >= 50) return 2.5;
    if (marks >= 40) return 2.0;
    return 0;
};

export const calculateFinalGPA = (data: any[]): number => {
    const totalGPA = data.reduce((sum, row) => sum + (row.GPA || 0), 0);
    return totalGPA / data.length;
};
