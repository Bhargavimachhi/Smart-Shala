const getIndividualAttendance= async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.json({
            presentDays: student.presentDays,
            absentDays: student.absentDays
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export default getIndividualAttendance;
