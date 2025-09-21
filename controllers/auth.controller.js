import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/drizzle.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { generateToken } from '../config/jwt.js';
import bcrypt from 'bcrypt';

const register = async(req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({ 
            status: "missing", 
            message: "Please provide all required fields" 
        });
    }

    try{

        const [existingUser] = await db.select().from(users).where(eq(users.email, email));
        if(existingUser){
            return res.status(400).json({ 
                status: "conflict", 
                message: "User with this email already exists" 
            });
        }

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

        const token = generateToken({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        })

        return res.status(200).json({
            status: "created",
            message: "User Created Successfully",
            data: token
        })

    }catch (error){
        return res.status(500).json({ 
            status: "unknown", 
            message: `Something Went Wrong. Details Here: ${error}` 
        });
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ 
            status: "missing", 
            message: "Please provide all required fields" 
        });
    }

    try{
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if(!user){
            return res.status(400).json({ 
                status: "not_found", 
                message: "User not found" 
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({ 
                status: "invalid", 
                message: "Invalid Credentials" 
            });
        }

        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email
        })

        return res.status(200).json({ 
            status: "success", 
            message: "Login Successful",
            data: token,
        });

    } catch (error){
        return res.status(500).json({ 
            status: "unknown", 
            message: `Something Went Wrong.'\n'Details Here:'\n' ${error}` 
        });
    }
}

const setAdminRole = async(req, res) => {
    const { id } = req.params;

    if( !id ){
        return res.status(400).json({ 
            status: "missing", 
            message: "Please provide all required fields" 
        });
    }

    try {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        if(!user){
            return res.status(404).json({ 
                status: "not_found", 
                message: "User not found" 
            });
        }

        if(user.roles.includes("admin")) {
            return res.status(400).json({ 
                status: "conflict", 
                message: "User already is Admin" 
            });
        }

        const roles = [...new Set([...user.roles, "admin"])];

        const [updatedUser] = await db.update(users)
            .set({ roles })
            .where(eq(users.id, id))
            .returning();

        return res.status(200).json({
            status: "success",
            message: "User roles updated successfully",
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json({ 
            status: "unknown",  
            message: `Something Went Wrong.'\n'Details Here:'\n' ${error}` 
        });
    }
}   

export { register, login, setAdminRole };