"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateProdutos1652727273168 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'produtos_gabiq',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generatedIdentity: 'ALWAYS',
                        generationStrategy: 'increment',
                        isGenerated: true,
                    },
                    {
                        name: 'product_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option0',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option1',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'option2',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'preco',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: 'stock',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('produtos_gabiq');
        });
    }
}
exports.default = CreateProdutos1652727273168;
