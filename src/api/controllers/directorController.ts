import { Request, Response } from 'express';
import { DirectorService } from '../../services';

export class DirectorController {
  public static async findAll(req: Request, res: Response): Promise<Response> {
    const directors = await new DirectorService().findAll()

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Directors fetched successfully.',
      data: directors,
    });
  }
  
  public static async create(req: Request, res: Response): Promise<Response> {
    const payload = req.body;
    const director = await new DirectorService().create(payload);
    
    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Director created successfully.',
      data: director,
    });
  }
  
  public static async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const data = req.body;
    
    const update = await new DirectorService().update(id, data);
    if(update === false) {
      throw new Error(`Couldnot update director with id ${id}`)	
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Director updated successfully.',
    });
  }
  
  public static async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    await new DirectorService().delete(id);
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Director deleted successfully.',
    });
  }
  public static async findOne(req: Request, res: Response): Promise<Response> {
    const director = await new DirectorService().findOne(parseInt(req.params.id));
  
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Director fetched successfully.',
      data: director,
    });
  }
  
}
