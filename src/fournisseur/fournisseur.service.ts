import { Injectable, NotFoundException } from '@nestjs/common';
import { Fournisseur } from './Fournisseur.interface';
import { CreateFournisseurDto } from './dto/create-fournisseur.dto';
import { UpdateFournisseurDto } from './dto/update-fournisseur.dto';
const db = require('../../models');

@Injectable()
export class FournisseurService {
    async createfournisseur(data: any): Promise<Fournisseur> {
        try {
            const fournisseur = await db.fournisseur.create(data)
            //console.log(db);
            //console.log(db.Fournisseur);
            return fournisseur;
        } catch (error) {
            throw new Error(`failed  to create fournisseur ${error.message}`);
        }
    }
    async getAllFournisseur(): Promise<Fournisseur[]> {
        const fournisseur = await db.fournisseur.findAll();
        if (!fournisseur || fournisseur.length == 0) {
            throw new NotFoundException('Fournisseur data not found!');
        }
        return fournisseur;
    }
    async getfournisseurById(id: number): Promise<Fournisseur> {
        const fournisseur = await db.fournisseur.findByPk(id);
        if (!fournisseur) {
            throw new NotFoundException(`fournisseur#${id} not found`);
        }
        return fournisseur;
    }
    async updatefournisseur(id: number, data: UpdateFournisseurDto,): Promise<UpdateFournisseurDto | string> {
        try {
            const existing = await db.fournisseur.findByPk(id);
            if (!existing) {
                return `fournisseur not found!`
            } else if (existing != null) {
                await db.fournisseur.update(data, { where: { id: id } })
                return existing;
            } else throw new NotFoundException(`fournisseur #${id} not found`);
        } catch (error) { throw new Error(`failed to get the fournisseur ${error.message}`) }
    }
  

    async deletefournisseurById(id: number): Promise<string> {
        const fournisseur = await this.getfournisseurById(id);
        if (!fournisseur) {
            throw new NotFoundException(`fournisseur #${id} not found`);
        } else {
            await db.fournisseur.destroy({ where: { id: id } });
            return `fournisseur with ID ${id} deleted successfully.`;
        }
    }
}

