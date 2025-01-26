export const CompareDate = async (req:any, res: any, next: any) => {
    const todaysDate = new Date(); //Today Date
    const expiryDate = new Date('2024-12-18');
    if (todaysDate > expiryDate) {
        const response = {
            success: false,
            status: 498,
            msg: "Your subscription has been expired."
        }
        res.send(response);
    } else {
        next();
    } 
}
