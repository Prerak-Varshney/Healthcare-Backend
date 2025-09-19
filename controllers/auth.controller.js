import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/drizzle.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

const register = async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ 
            authStatus: "incomplete", 
            message: "Please provide all required fields" 
        });
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const [newUser] = await db
        .insert(users)
        .values({
            id: uuidv4(),
            name,
            email,
            password: hashedPassword
        })
        .returning();

        res.status(200).json({
            status: "success",
            message: "User Created Successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })

    }catch (error){
        res.status(500).json({ 
            authStatus: "failed", 
            message: `Something Went Wrong. Details Here: ${error}` 
        });
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ 
            authStatus: "incomplete", 
            message: "Please provide all required fields" 
        });
    }

    try{
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if(!user){
            return res.status(400).json({ 
                authStatus: "invalid", 
                message: "Invalid Credentials" 
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({ 
                authStatus: "invalid", 
                message: "Invalid Credentials" 

            });
        }

        res.status(200).json({ 
            authStatus: "success", 
            message: "Login Successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            } 
        });

    } catch (error){
        res.status(500).json({ 
            authStatus: "failed", 
            message: `Something Went Wrong.'\n'Details Here:'\n' ${error}` 
        });
    }
}

export {register, login };